import { Button, Card, Col } from "antd";
import styles from "./archive-box.module.scss";
import Link from "next/link";
import Text from "antd/es/typography/Text";
import { isTextStartsWithArabic } from "@/helpers/functions";
import { POST_SHOWCASE_LENGTH } from "@/helpers/config";
import { useLocale, useTranslations } from "next-intl";
import BookmarkBtn from "../other-comps/bookmark-btn";

let highlightStyle = "color: red; font-weight: bold; background-color: yellow;";

function ArchiveBox({ post, keyword }) {
  const t = useTranslations("archive");
  const i = useLocale();

  const postTitle = post.titles[i];
  const postBody = post.bodies[i];

  let generatedBody = "";
  const generateBody = () => {
    let a = postBody
      .trim()
      .replace(/<\/?[^>]+(>|$)/g, "") // escape html
      .slice(0, POST_SHOWCASE_LENGTH);

    // replace for keyword
    if (keyword) {
      a = a
        .toLowerCase()
        // first replace all rejex(keyword) to keyword // rejex is the english word no matter of the letter case, or the arabic word no matter of the vowels
        .replaceAll(
          keyword.toLowerCase(),
          `<span style="${highlightStyle}">${keyword}</span>`
        );
    }

    generatedBody = a + "...";
  };
  generateBody();

  let generatedTitle = "";
  const generateTitle = () => {
    let a = postTitle
      .trim()
      .replace(/<\/?[^>]+(>|$)/g, "") // escape html
      .slice(0, POST_SHOWCASE_LENGTH);

    // replace for keyword
    if (keyword) {
      a = a
        .toLowerCase()
        // first replace all rejex(keyword) to keyword // rejex is the english word no matter of the letter case, or the arabic word no matter of the vowels
        .replaceAll(
          keyword.toLowerCase(),
          `<span style="${highlightStyle}">${keyword}</span>`
        );
    }

    generatedTitle = a;
  };
  generateTitle();

  return (
    <Col>
      <Card
        title={
          <div className={styles.title}>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: ".5rem",
              }}
            >
              <span
                style={{ fontSize: "16px", fontWeight: "600" }}
                dangerouslySetInnerHTML={{ __html: generatedTitle }}
              ></span>
              <BookmarkBtn id={post.id} />
            </div>
          </div>
        }
        variant={true}
        style={{
          height: "100%",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s ease",
          display: "flex",
          flexDirection: "column",
        }}
        styles={{
          header: { padding: "12px" },
          body: {
            padding: "12px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <div
          style={{
            direction: isTextStartsWithArabic(postTitle) ? "rtl" : "ltr",
            fontSize: "14px",
            color: "#555",
            lineHeight: "1.6",
            marginBottom: "16px",
            flex: 1,
          }}
          dangerouslySetInnerHTML={{
            __html: generatedBody,
          }}
        />

        <div style={{ marginTop: "auto" }}>
          <p
            style={{
              fontSize: "14px",
              color: "#777",
              margin: "10px 0",
            }}
          >
            {t("box.author")}:{" "}
            <strong style={{ color: "#333" }}>{post.author}</strong>
          </p>

          <div className={styles.foot}>
            <Link href={`/archive/${post.id}`}>
              <Button type="primary">{t("box.show")}</Button>
            </Link>
            <Text
              style={{
                wordBreak: "keep-all",
                color: "#999",
                fontSize: "12px",
                fontWeight: "500",
              }}
              mark
            >
              #{post.id}
            </Text>
          </div>
        </div>
      </Card>
    </Col>
  );
}

export default ArchiveBox;
