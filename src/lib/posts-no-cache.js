import { LANGUAGES } from "@/helpers/config";
import { revalidatePath } from "next/cache";

export async function createPost(post, supabase) {
  const { data, error } = await supabase
    .from("postsb")
    .upsert([post], {
      onConflict: "id", // Conflict resolution target
    })
    .select();

  // Get all supported locales from your configuration

  // Revalidate for each locale
  LANGUAGES.map((a) => a.key).forEach((locale) => {
    revalidatePath(`/${locale}/archive/`);
    revalidatePath(`/${locale}/archive/${post.id}`);
  });
}

export async function deletePost(id, supabase) {
  try {
    const { error } = await supabase.from("postsb").delete().eq("id", id);
    LANGUAGES.map((a) => a.key).forEach((locale) => {
      // revalidatePath(`/${locale}/archive/`);
      revalidatePath(`/${locale}/archive/${id}`);
    });
    return true;
  } catch (err) {
    console.log(err);
  }
}
