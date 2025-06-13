import { cache } from "react";
import { revalidatePath } from "next/cache";
import { query } from "@/lib/db"; // Assuming this connects to your NeonDB PostgreSQL database
import { DEFAULT_POSTS_LIM, LANGUAGES } from "@/helpers/config";

export const getPost = cache(async function (id) {
  try {
    const { rows } = await query("SELECT * FROM posts WHERE id = $1", [id]);
    return rows[0] || null; // Return the first row or null if not found
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
});

export const getPosts = cache(async function (
  page = 1,
  limit = DEFAULT_POSTS_LIM
) {
  const offset = (page - 1) * limit;

  try {
    // Get total count
    const { rows: countRows } = await query("SELECT COUNT(*) FROM posts");
    const totalCount = parseInt(countRows[0].count, 10);

    // Get paginated posts
    const { rows: posts } = await query(
      "SELECT * FROM posts ORDER BY id ASC OFFSET $1 LIMIT $2",
      [offset, limit]
    );

    return {
      posts,
      totalCount,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; // Rethrow to be handled by calling context
  }
});

export const searchPosts = cache(async function (
  keyword,
  page = 1,
  limit = DEFAULT_POSTS_LIM
) {
  if (!keyword?.trim()) return { posts: [], totalCount: 0 };

  const offset = (page - 1) * limit;
  const searchPattern = `%${keyword.trim()}%`;

  try {
    // Use a common table expression (CTE) to get count and paginated data efficiently
    const { rows } = await query(
      `WITH filtered_posts AS (
         SELECT *
         FROM posts
         WHERE
           author ILIKE $1 OR
           titles->>'ar' ILIKE $1 OR
           titles->>'en' ILIKE $1 OR
           bodies->>'ar' ILIKE $1 OR
           bodies->>'en' ILIKE $1
       )
       SELECT
         (SELECT COUNT(*) FROM filtered_posts) AS total_count,
         filtered_posts.*
       FROM filtered_posts
       OFFSET $2 LIMIT $3;`,
      [searchPattern, offset, limit]
    );

    if (rows.length === 0) {
      return { posts: [], totalCount: 0 };
    }

    // Extract total_count from the first row and then map to actual posts
    const totalCount = parseInt(rows[0].total_count, 10);
    const posts = rows.map(({ total_count, ...rest }) => rest); // Remove total_count from each post object

    return { posts, totalCount };
  } catch (error) {
    console.error("Error searching posts:", error);
    throw error;
  }
});

export async function createPost(post) {
  // Supabase's upsert with onConflict is equivalent to PostgreSQL's INSERT ... ON CONFLICT DO UPDATE
  // We need to dynamically build the SQL query based on the 'post' object keys.

  const { id, ...postWithoutId } = post; // Separate id from other fields for INSERT/UPDATE
  const keys = Object.keys(postWithoutId);
  const values = Object.values(postWithoutId);

  // PostgreSQL specific type casting for JSONB columns might be needed if values are not plain objects
  // For example, if titles and bodies are JSON objects, they should be cast to ::jsonb

  // Build column names for INSERT and UPDATE
  const insertColumns = ["id", ...keys].join(", ");
  const insertPlaceholders = ["$1", ...keys.map((_, i) => `$${i + 2}`)].join(
    ", "
  );

  // Build the SET clause for ON CONFLICT DO UPDATE
  const updateSetClause = keys
    .map((key, i) => `${key} = $${i + 2}`) // Use the same placeholder index as INSERT, but referencing the conflict object
    .join(", ");

  const sql = `
    INSERT INTO posts (${insertColumns})
    VALUES (${insertPlaceholders})
    ON CONFLICT (id) DO UPDATE SET
      ${updateSetClause}
    RETURNING *;
  `;

  try {
    const { rows } = await query(sql, [id, ...values]);
    const createdOrUpdatedPost = rows[0]; // The RETURNING * clause gives us the inserted/updated row

    // Revalidate for each locale after successful operation
    LANGUAGES.map((a) => a.key).forEach((locale) => {
      revalidatePath(`/${locale}/archive/`);
      revalidatePath(`/${locale}/archive/${createdOrUpdatedPost.id}`);
    });

    return createdOrUpdatedPost; // Return the created or updated post data
  } catch (error) {
    console.error("Error creating/updating post:", error);
    throw error; // Rethrow to be handled by calling context
  }
}

export async function deletePost(id) {
  try {
    // Delete the post from database
    await query("DELETE FROM posts WHERE id = $1", [id]);

    // Revalidate paths
    LANGUAGES.map((a) => a.key).forEach((locale) => {
      revalidatePath(`/${locale}/archive/`); // Consider if this is needed if only specific post is deleted
      revalidatePath(`/${locale}/archive/${id}`);
    });

    // ----- IMPORTANT: Supabase Storage vs. NeonDB (PostgreSQL) -----
    // The following code is for Supabase Storage, which is an object storage service.
    // NeonDB is a PostgreSQL database service and does NOT provide object storage.
    // If you were storing images/files in Supabase Storage, you MUST migrate them
    // to a different object storage solution (e.g., AWS S3, Cloudflare R2, Vercel Blob)
    // and implement deletion logic for that new service here.
    // The code below will cause an error if 'supabase' is not defined or if you
    // try to use storage functions on a database connection.
    /*
    const { data: files, error: listError } = await supabase.storage
      .from("posts-images") // Bucket name
      .list(`${id}`); // Directory path relative to bucket root
    if (listError) throw listError;

    // If files exist in the directory
    if (files && files.length > 0) {
      // Delete each file in the directory
      const filePaths = files.map((file) => `${id}/${file.name}`);

      const { error: deleteError } = await supabase.storage
        .from("posts-images")
        .remove(filePaths);

      if (deleteError) throw deleteError;
    }
    */
    // -------------------------------------------------------------

    return true; // Indicate successful deletion
  } catch (err) {
    console.error("Error deleting post:", err);
    return false; // Indicate failure
  }
}
