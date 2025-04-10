import { getPost } from "@/lib/posts";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids")?.split(",").map(Number);
  try {
    let posts = [];

    for (let id of ids) {
      const post = await getPost(id);
      if (post) posts.push(post);
    }

    // const posts = getPosts();
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
