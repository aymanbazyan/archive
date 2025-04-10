import supabase from "./supabase";

// async function signInWithGoogle(redirectUrl) {
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: "google",
//     options: {
//       redirectTo: redirectUrl,
//     },
//   });
//   if (error) {
//     console.error("Error signing in with Google:", error);
//     return null;
//   }
//   return data;
// }

async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  return data;
}

export { signInWithGoogle };
