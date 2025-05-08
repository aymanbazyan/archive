"use cache";
import { DEFAULT_POSTS_LIM } from "@/helpers/config";
import supabase from "@/lib/supabase";

export async function getPost(id) {
  const { data, error } = await supabase
    .from("posts")
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
    .from("posts")
    .select("*", { count: "exact", head: true });

  // Get paginated posts
  const { data, error } = await supabase
    .from("posts")
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
    .from("posts")
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
