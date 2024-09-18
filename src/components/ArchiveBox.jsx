import { Button, Card, Col, Typography } from "antd";
import {
  aCode,
  getFromLocal,
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
    // getFromLocal("bookmarks")?.some((bookId) => post?.id == bookId)
    getFromLocal("bookmarks")?.[post?.id]
  );

  if (isLoading) return <Loading />;
  if (!post) return null;
  const bodyShowcase = aCode(post.bodies[i.language], false).slice(
    0,
    POST_SHOWCASE_LENGTH
  );

  return (
    <Col>
      <Card
        title={
          <StyledTitle>
            {aCode(post.titles[i.language], false)}

            <Button
              onClick={() => toggleSave(post.id, setIsBookmarked)}
              shape="circle"
              icon={
                <Icon
                  icon={
                    isBookmarked ? "tabler:bookmark-filled" : "tabler:bookmark"
                  }
                />
              }
            />
          </StyledTitle>
        }
        bordered={false}
      >
        <p
          style={{
            direction: isTextStartsWithArabic(bodyShowcase) ? "rtl" : "ltr",
          }}
        >
          {bodyShowcase.replace(/<\/?[^>]+(>|$)/g, "")}...
        </p>
        <p>
          {t("archive.box.author")}:{" "}
          <strong>{aCode(post.author, false)}</strong>
        </p>

        <StyledFoot>
          <Link to={`/archive/${post.id}`}>
            <Button type="primary">{t("archive.box.show")}</Button>
          </Link>
          <Typography.Text style={{ wordBreak: "keep-all" }} mark>
            {post.id}
          </Typography.Text>
        </StyledFoot>
      </Card>
    </Col>
  );
});
ArchiveBox.displayName = "ArchiveBox";

export default ArchiveBox;
