import { Button, Card, Col, Typography } from "antd";
import {
  aCode,
  getFromLocal,
  htmlToNode,
  isTextStartsWithArabic,
  saveToLocal,
  toggleSave,
} from "../helpers/helpers";
import {
  POST_SHOWCASE_LENGTH,
  TIME_BEFORE_REFETCH_POST,
} from "../helpers/config";
import { Link } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import { searchPosts } from "../features/firebase";
import Loading from "./Loading";
import { Icon } from "@iconify/react/dist/iconify.js";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const StyledTitle = styled.div`
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;

  & button {
    margin: 0 !important;
    font-size: 1.2rem;
  }
`;

const StyledFoot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;

  & button {
    margin: 0 !important;
  }
`;

const ArchiveBox = memo(function ({ index, setStopRendering }) {
  const [isLoading, setIsLoading] = useState(true);
  const [t, i] = useTranslation("global");

  let savedPost = getFromLocal(index);
  const [post, setPost] = useState(
    Date.now() - savedPost?.downloadedAt >= TIME_BEFORE_REFETCH_POST
      ? null
      : savedPost
  );

  useEffect(
    function () {
      if (post) {
        setIsLoading(false);
        return;
      }

      async function init() {
        try {
          const a = await searchPosts(aCode(index));
          if (!a.length) {
            setIsLoading(false);
            setStopRendering(true);
            return;
          }

          setPost(a[0]);
          saveToLocal(index, { ...a[0], downloadedAt: Date.now() });
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      }
      init();
    },
    [index, post, setStopRendering]
  );

  const [isBookmarked, setIsBookmarked] = useState(
    getFromLocal("bookmarks")?.[post?.id]
  );

  if (isLoading) return <Loading />;
  if (!post) return null;

  let decTitle = aCode(post.titles[i.language], false);
  let decBodyNodes = htmlToNode(aCode(post.bodies[i.language], false));
  let decBodyText;
  decBodyNodes.forEach((node) => {
    if (node.textContent.trim().length >= POST_SHOWCASE_LENGTH) {
      decBodyText = node.textContent.trim().slice(0, POST_SHOWCASE_LENGTH);
      return;
    }
  });
  if (!decBodyText) decBodyText = decTitle;
  // const bodyShowcase = `<div>${}</div>`;

  return (
    <Col id={`post${post.id}`} style={{ marginBottom: "24px", padding: 0 }}>
      <Card
        title={
          <StyledTitle>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: ".5rem",
              }}
            >
              <span style={{ fontSize: "16px", fontWeight: "600" }}>
                {decTitle}
              </span>
              <Button
                onClick={() => toggleSave(post.id, setIsBookmarked)}
                shape="circle"
                icon={
                  <Icon
                    icon={
                      isBookmarked
                        ? "tabler:bookmark-filled"
                        : "tabler:bookmark"
                    }
                    style={{ color: isBookmarked ? "#1890ff" : "#000" }}
                  />
                }
              />
            </div>
          </StyledTitle>
        }
        bordered={true}
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
        <p
          style={{
            direction: isTextStartsWithArabic(decBodyText) ? "rtl" : "ltr",
            fontSize: "14px",
            color: "#555",
            lineHeight: "1.6",
            marginBottom: "16px",
            flex: 1,
          }}
        >
          <div>{decBodyText.replace(/<\/?[^>]+(>|$)/g, "")}...</div>
        </p>

        <div style={{ marginTop: "auto" }}>
          <p
            style={{
              fontSize: "14px",
              color: "#777",
              margin: "10px 0",
            }}
          >
            {t("archive.box.author")}:{" "}
            <strong style={{ color: "#333" }}>
              {aCode(post.author, false)}
            </strong>
          </p>

          <StyledFoot>
            <Link to={`/archive/${post.id}`}>
              <Button type="primary">{t("archive.box.show")}</Button>
            </Link>
            <Typography.Text
              style={{
                wordBreak: "keep-all",
                color: "#999",
                fontSize: "12px",
                fontWeight: "500",
              }}
              mark
            >
              #{post.id}
            </Typography.Text>
          </StyledFoot>
        </div>
      </Card>
    </Col>
  );
});
ArchiveBox.displayName = "ArchiveBox";

export default ArchiveBox;
