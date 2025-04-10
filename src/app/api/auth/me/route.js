import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET(request) {
  const accessToken = request.cookies.get("sb-access-token")?.value;
  const refreshToken = request.cookies.get("sb-refresh-token")?.value;

  if (!accessToken || !refreshToken) {
    return NextResponse.json({ user: null });
  }

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);
    if (error) throw error;

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}
