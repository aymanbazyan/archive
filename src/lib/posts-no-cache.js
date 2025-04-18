import { LANGUAGES } from "@/helpers/config";
import { revalidatePath } from "next/cache";

export async function createPost(post, supabase) {
  const { data, error } = await supabase
    .from("posts")
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
    // Delete the post from database
    await supabase.from("posts").delete().eq("id", id);

    // Revalidate paths
    LANGUAGES.map((a) => a.key).forEach((locale) => {
      // revalidatePath(`/${locale}/archive/`);
      revalidatePath(`/${locale}/archive/${id}`);
    });

    // Delete storage directory and its contents
    const { data: files, error: listError } = await supabase.storage
      .from("posts-images") // Bucket name
      .list(`${id}`); // Directory path relative to bucket root
    if (listError) throw listError;

    // If files exist in the directory
    if (files && files.length > 0) {
      // Delete each file in the directory
      const filePaths = files.map((file) => `${id}/${file.name}`);

      const { error: deleteError } = await supabase.storage
        .from("posts-images")
        .remove(filePaths);

      if (deleteError) throw deleteError;
    }

    // Note: Supabase automatically removes empty folders/prefixes
    // so you don't need to explicitly delete the directory itself

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
