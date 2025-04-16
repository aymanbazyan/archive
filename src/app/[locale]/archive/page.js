import PaginationWrapper from "@/components/archive-comps/pagination-wrapper";
import styles from "./page.module.scss";
import ArchiveBox from "@/components/archive-comps/archive-box";
import { DEFAULT_POSTS_LIM } from "@/helpers/config";
import { getPosts, searchPosts } from "@/lib/posts";
import ArchiveForm from "@/components/archive-comps/archive-form";
import { isTextStartsWithArabic } from "@/helpers/functions";
import { Suspense } from "react";

export default async function ArchivePage({ searchParams }) {
  const awaitedSearchParams = await searchParams;

  return (
    <div className={styles.container}>
      <ArchiveForm defaultKeyword={awaitedSearchParams?.keyword} />
      {/* <Suspense fallback={<div>....</div>}> */}
      <ArchiveContent searchParams={awaitedSearchParams} />
      {/* </Suspense> */}
    </div>
  );
}

async function ArchiveContent({ searchParams }) {
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
