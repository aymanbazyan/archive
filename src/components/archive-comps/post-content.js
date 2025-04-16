"use cache";

import styles from "./post-content.module.scss";
import { isTextStartsWithArabic } from "@/helpers/functions";
import Text from "antd/es/typography/Text";
import GoBackLink from "@/components/other-comps/go-back-link";
import BookmarkBtn from "@/components/other-comps/bookmark-btn";
import ReadingBar from "@/components/archive-comps/reading-bar";
import "./ck.scss";
import { getPost } from "@/lib/posts";
import {
  Btn,
  Card,
  // Divider,
} from "@/components/antd-comps/antd-alt-for-caching";
import CopyPostBtn from "./copy-post-btn";
import CopyLinkBtn from "./copy-link-btn";
import { notFound } from "next/navigation";

export default async function PostContent({ id, l, translations }) {
  // Server-side translation fetching
  const post = await getPost(Number(id));

  if (!post) notFound();

  const title = post.titles[l];
  const body = post.bodies[l];

  return (
    <>
      <ReadingBar />
      <div className={styles.container}>
        <Card title={title} variant={false} bordered={false}>
          <div className={styles.buttonsBox}>
            <GoBackLink>
              <Btn type="primary">{translations.return}</Btn>
            </GoBackLink>
            <CopyPostBtn title={title} />
            <CopyLinkBtn />
            <BookmarkBtn id={post.id} />
          </div>
          <br />

          <div
            // ref={bodyRef}
            style={{
              direction: isTextStartsWithArabic(body) ? "rtl" : "ltr",
            }}
            dangerouslySetInnerHTML={{ __html: body }}
            className={`${styles.bodyText} ck-content`}
          />

          <br />
          <div style={{ display: "grid", gap: ".3rem" }}>
            <p>
              {translations.id}:{" "}
              <strong>
                <Text mark>{post.id}</Text>
              </strong>
            </p>
            <p>
              {translations.author}: <strong>{post.author}</strong>
            </p>

            <GoBackLink>
              <Btn type="primary">{translations.return}</Btn>
            </GoBackLink>
          </div>
        </Card>
        {/* <Divider /> */}

        {/* <CommentSection postId={post.id} /> */}
      </div>
    </>
  );
}
