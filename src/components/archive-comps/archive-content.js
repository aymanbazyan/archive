export const dynamic = "force-dynamic";
import PaginationWrapper from "@/components/archive-comps/pagination-wrapper";
import ArchiveBox from "@/components/archive-comps/archive-box";
import { DEFAULT_POSTS_LIM } from "@/helpers/config";
import { getPosts, searchPosts } from "@/lib/posts";
import { isTextStartsWithArabic } from "@/helpers/functions";

export default async function ArchiveContent({ searchParams, styles }) {
  const currentPage = searchParams?.page ? parseInt(searchParams.page) : 1;
  const keyword = searchParams?.keyword;
  let data = { posts: [], totalCount: 0 };

  if (keyword)
    data = await searchPosts(keyword, currentPage, DEFAULT_POSTS_LIM);
  else data = await getPosts(currentPage, DEFAULT_POSTS_LIM);

  return (
    <>
      <PaginationWrapper
        keyword={keyword}
        currentPage={currentPage}
        totalCount={data.totalCount}
        defaultPageSize={DEFAULT_POSTS_LIM}
      />
      {keyword && (
        <p
          style={{
            direction: isTextStartsWithArabic(
              `${data.totalCount} Search results for "${keyword}"`
            )
              ? "rtl"
              : "ltr",
          }}
        >
          {data.totalCount} Search results for "{keyword}"
        </p>
      )}
      <div className={styles.box}>
        {data.posts.map((post) => (
          <ArchiveBox key={post.id} post={post} keyword={keyword} />
        ))}
      </div>
      <PaginationWrapper
        keyword={keyword}
        currentPage={currentPage}
        totalCount={data.totalCount}
        defaultPageSize={DEFAULT_POSTS_LIM}
      />
    </>
  );
}
