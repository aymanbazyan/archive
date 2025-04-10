import { Button, Card, Divider, Select } from "antd";
import styles from "./page.module.scss";
import { useLocale, useTranslations } from "next-intl";
import { isTextStartsWithArabic } from "@/helpers/functions";
import Text from "antd/es/typography/Text";
import { Icon } from "@iconify/react";
import "./ck.scss";
import { getPost } from "@/lib/posts";
import GoBackLink from "@/components/other-comps/go-back-link";
import BookmarkBtn from "@/components/other-comps/bookmark-btn";
import ReadingBar from "@/components/archive-comps/reading-bar";

export async function generateMetadata({ params: { id } }) {
  const post = await getPost(Number(id));

  return {
    title: `${post.titles.en} | ${post.titles.ar}`,
    descriptions: `${post.bodies.en} | ${post.bodies.ar}`,
  };
}

function PostPageWrapper({ params: { id } }) {
  const l = useLocale();
  const t = useTranslations("post");

  return <PostPage l={l} id={id} t={t} />;
}

export default PostPageWrapper;

async function PostPage({ id, l, t }) {
  const post = await getPost(Number(id));

  const title = post.titles[l];
  const body = post.bodies[l];

  return (
    <>
      <ReadingBar />
      <div className={styles.container}>
        <Card title={title} variant={false}>
          <div className={styles.buttonsBox}>
            <GoBackLink>
              <Button type="primary">{t("return")}</Button>
            </GoBackLink>
            <Button
              shape="circle"
              icon={<Icon icon="ph:copy" />}
              title={t("copy")}
              // onClick={() => {
              //   const postContent = getElementContent(
              //     document.querySelector(".ck-content")
              //   );

              //   const toCopy = `${window.location.origin}${window.location.pathname} \n\n ${title} \n\n ${postContent}`;
              //   navigator.clipboard.writeText(toCopy);

              //   bodyRef.current.innerHTML = decryptedBody; // links get corrupt, return it to normal
              // }}
            />
            <Button
              shape="circle"
              icon={<Icon icon="solar:link-bold" />}
              title={t("link")}
              // onClick={() => navigator.clipboard.writeText(window.location.href)}
            />
            <BookmarkBtn id={post.id} />
            <Select
              defaultValue={l}
              title={t("changeLang")}
              style={{
                width: 80,
              }}
              // onChange={handleChange}
              options={[
                {
                  value: "en",
                  label: "EN",
                },
                {
                  value: "ar",
                  label: "AR",
                },
              ]}
            />
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
              {t("id")}:{" "}
              <strong>
                <Text mark>{post.id}</Text>
              </strong>
            </p>
            <p>
              {t("author")}: <strong>{post.author}</strong>
            </p>

            <GoBackLink>
              <Button type="primary">{t("return")}</Button>
            </GoBackLink>
          </div>
        </Card>
        <Divider />
        {/* <CommentSection postId={post.id} /> */}
      </div>
    </>
  );
}
