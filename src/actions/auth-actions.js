"use server";

import { signInWithPassword } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function signin(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  let success = false;
  try {
    const data = await signInWithPassword(email, password);

    if (data?.session?.access_token) {
      // Handle successful login
      const awaitedCookies = await cookies();
      awaitedCookies.set("auth-token", data.session.access_token, {
        secure: true,
        sameSite: "lax",
        // The sameSite attribute prevents cross-site request forgery (CSRF) attacks by controlling when cookies are sent:
        // Lax: Cookies are sent with same-site requests and top-level navigations (e.g., clicking a link to your site).
      });
      success = true;
    }
  } catch (error) {
    console.error("Authentication error:", error);
  }
  if (success) redirect("/admin/panel"); // cant be used in try/catch
}

export { signin };
