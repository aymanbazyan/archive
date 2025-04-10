import { signInWithGoogle } from "@/lib/auth";

async function GET(req) {
  const redirectUrl = req.headers.get("referer");
  const data = await signInWithGoogle(redirectUrl);
  if (data.error) {
    return new Response(JSON.stringify({ error: data.error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  const googleUrl = data.url;
  return new Response(JSON.stringify({ googleUrl }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
export { GET };
