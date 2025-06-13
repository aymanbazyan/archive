"use server";
import { getPost } from "@/lib/posts";
import { createPost, deletePost } from "@/lib/posts";
import { validateAuth } from "@/actions/auth-actions";
import { NextResponse } from "next/server";

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

export async function POST(req) {
  try {
    // Validate admin session
    await validateAuth();

    const reqData = await req.json();
    await createPost(reqData.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      error: error.message,
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    // Validate admin session
    await validateAuth();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const success = await deletePost(id);
    if (success) return new Response(null, { status: 204 });
    else return new Response(null, { status: 500 });
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 500 });
  }
}
