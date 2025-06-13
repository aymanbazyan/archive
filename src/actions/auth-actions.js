"use server";

import {
  getUserFromToken,
  signInWithPassword,
  // createAdminAccount,
} from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function validateAuth() {
  const token = cookies().get("auth-token")?.value;
  if (!token) {
    redirect("/admin/login");
  }

  const result = await getUserFromToken(token);
  if (!result.success) {
    cookies().delete("auth-token");
    redirect("/admin/login");
  }

  return result.user;
}

async function signin(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  let success = false;
  try {
    const { data } = await signInWithPassword(email, password);
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
    // else throw new Error(data.error.message);
  } catch (error) {
    console.error("Authentication error:", error);
  }
  if (success) redirect("/admin/panel"); // cant be used in try/catch
}

async function createAdmin(formData) {
  // const email = formData.get("email");
  // const password = formData.get("password");
  // if (!email || !password) {
  //   return {
  //     success: false,
  //     error: "Email and password are required.",
  //   };
  // }
  // const result = await createAdminAccount(email, password);
  // if (result.success) {
  //   // Optionally sign in the admin after creation
  //   await signin(formData);
  // }
  // return result;
}

export { signin, createAdmin, validateAuth };
