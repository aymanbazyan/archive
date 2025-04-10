import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      throw new Error(error);
    }

    if (!code) {
      throw new Error("No authorization code found");
    }

    // Exchange the code for session
    const { data, error: authError } =
      await supabase.auth.exchangeCodeForSession(code);

    // console.log("i sent ", code, " and i got ", data);

    if (authError) throw authError;

    // Create redirect response
    const response = NextResponse.redirect(new URL("/", request.url));

    // Set cookies securely
    response.cookies.set("sb-access-token", data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: data.session.expires_in,
      sameSite: "lax",
      path: "/",
    });

    response.cookies.set("sb-refresh-token", data.session.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Auth callback error:", error);
    return NextResponse.redirect(
      new URL(`/login?error=${error.message}`, request.url)
    );
  }
}
