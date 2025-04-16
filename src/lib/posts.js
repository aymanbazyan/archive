"use cache";
// lib/posts.js
import { DEFAULT_POSTS_LIM } from "@/helpers/config";
import supabase from "@/lib/supabase";

// import { seedFakePosts } from "./seedFakePosts";
// seedFakePosts();

export async function getPost(id) {
  const { data, error } = await supabase
    .from("postsb")
    .select()
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function getPosts(page = 1, limit = DEFAULT_POSTS_LIM) {
  const start = (page - 1) * limit;
  const end = page * limit - 1;

  // Get total count
  const { count } = await supabase
    .from("postsb")
    .select("*", { count: "exact", head: true });

  // Get paginated posts
  const { data, error } = await supabase
    .from("postsb")
    .select()
    .order("id", { ascending: true })
    .range(start, end);

  if (error) throw error;

  return {
    posts: data,
    totalCount: count,
  };
}

export async function searchPosts(
  keyword,
  page = 1,
  limit = DEFAULT_POSTS_LIM
) {
  if (!keyword?.trim()) return { posts: [], totalCount: 0 };

  const start = (page - 1) * limit;
  const end = page * limit - 1;

  const {
    data: posts,
    error,
    count: totalCount,
  } = await supabase
    .from("postsb")
    .select("*", { count: "exact" })
    .or(
      `author.ilike.%${keyword}%,` +
        `titles->>ar.ilike.%${keyword}%,titles->>en.ilike.%${keyword}%,` +
        `bodies->>ar.ilike.%${keyword}%,bodies->>en.ilike.%${keyword}%`
    )
    .range(start, end);

  if (error) throw error;

  return { posts, totalCount };
}

////////////////////////// sqlite approach:
/*
import sql from "better-sqlite3";

const db = new sql("posts.db");


// function initDb() {
//   db.exec(`
//       CREATE TABLE IF NOT EXISTS posts (
//         id INTEGER PRIMARY KEY,
//         author TEXT,
//         titles TEXT,  -- Will store JSON {ar: "...", en: "..."}
//         bodies TEXT   -- Will store JSON {ar: "...", en: "..."}
//       );
//     `);
// }

// initDb();


///////////////////////////////////////

function createPost(post) {
  const stmt = db.prepare(`
      INSERT INTO posts (id, author, titles, bodies)
      VALUES (?, ?, ?, ?)
    `);

  stmt.run(
    post.id,
    post.author,
    JSON.stringify(post.titles), // Convert titles object to JSON string
    JSON.stringify(post.bodies) // Convert bodies object to JSON string
  );

  return post;
}

function getPost(id) {
  const stmt = db.prepare(`
        SELECT * FROM posts WHERE id = ?
      `);

  const row = stmt.get(id);

  if (!row) {
    return null; // or throw new Error("Post not found");
  }

  // Parse the JSON strings back to objects
  return {
    ...row,
    titles: JSON.parse(row.titles),
    bodies: JSON.parse(row.bodies),
  };
}

function getPosts(page, limit) {
  // Calculate offset from current page (page starts at 1)
  const offset = (page - 1) * limit;

  // Query total count of posts for pagination
  const totalCountStmt = db.prepare(`SELECT COUNT(*) as count FROM posts`);
  const { count: totalCount } = totalCountStmt.get();

  // Query posts with proper ordering, limit, and offset
  const stmt = db.prepare(`
    SELECT * FROM posts 
    ORDER BY id ASC
    LIMIT ? OFFSET ?
  `);
  const rows = stmt.all(limit, offset);

  const posts = rows.map((row) => ({
    ...row,
    titles: JSON.parse(row.titles),
    bodies: JSON.parse(row.bodies),
  }));

  return { posts, totalCount };
}

function searchPosts(keyword, page, limit) {
  console.log();
  if (!keyword.trim() || !page || !limit) return;
  // Calculate offset from current page (page starts at 1)
  const offset = (page - 1) * limit;
  const searchPattern = `%${keyword}%`;

  // First, get the total count of matching posts
  const countStmt = db.prepare(`
    SELECT COUNT(*) as count FROM posts 
    WHERE id LIKE ? 
      OR author LIKE ? 
      OR titles LIKE ? 
      OR bodies LIKE ?
  `);
  const { count: totalCount } = countStmt.get(
    searchPattern,
    searchPattern,
    searchPattern,
    searchPattern
  );

  // Now fetch the paginated posts
  const stmt = db.prepare(`
    SELECT * FROM posts 
    WHERE id LIKE ? 
      OR author LIKE ? 
      OR titles LIKE ? 
      OR bodies LIKE ?
    ORDER BY id ASC
    LIMIT ? OFFSET ?
  `);

  const rows = stmt.all(
    searchPattern,
    searchPattern,
    searchPattern,
    searchPattern,
    limit,
    offset
  );

  const posts = rows.map((row) => ({
    ...row,
    titles: JSON.parse(row.titles),
    bodies: JSON.parse(row.bodies),
  }));

  return { posts, totalCount };
}

export { getPosts, createPost, getPost, searchPosts };

// /////////////////////////////////////
*/
