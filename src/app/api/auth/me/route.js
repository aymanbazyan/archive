"use server";
import { getUserFromToken } from "@/lib/auth";

async function GET(req) {
  const authHeader = req.headers.get("Authorization");

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Assuming the token is in the format "Bearer <token>"
    const res = await getUserFromToken(token);
    // console.log(res?.user);
    if (res?.user) return Response.json(res.user);
    else
      return new Response(JSON.stringify({ error: "Something went wrong" }), {
        status: 500,
      });
  } else {
    console.log("Authorization header is missing");
  }
}

export { GET };
