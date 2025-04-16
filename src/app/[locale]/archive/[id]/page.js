import { useLocale, useTranslations } from "next-intl";
import { getPost } from "@/lib/posts";
import PostContent from "@/components/archive-comps/post-content";

export async function generateMetadata({ params: { id } }) {
  const post = await getPost(Number(id));

  return {
    title: `${post.titles.en} | ${post.titles.ar}`,
    description: `${post.bodies.en} | ${post.bodies.ar}`,
  };
}

function PostPageWrapper({ params: { id } }) {
  const l = useLocale();
  const t = useTranslations("post");

  // Pass translations as props instead of the t function
  const translations = {
    // Add all the translation keys you need
    return: t("return"),
    copy: t("copy"),
    link: t("link"),
    author: t("author"),
    id: t("id"),
  };

  return <PostContent l={l} id={id} translations={translations} />;
}

export default PostPageWrapper;
