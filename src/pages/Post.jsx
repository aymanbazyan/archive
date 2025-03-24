import { useEffect, useRef, useState } from "react";
import { Card, Button, Typography, Flex, Select, Divider } from "antd";
import { fetchData } from "../features/firebase";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import styled from "styled-components";
import {
  aCode,
  getElementContent,
  getFromLocal,
  isTextStartsWithArabic,
  saveToLocal,
  toggleSave,
} from "../helpers/helpers";
import { TIME_BEFORE_REFETCH_POST } from "../helpers/config";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslation } from "react-i18next";
import CommentSection from "../components/CommentSection";

const StyledBodyText = styled.p`
  font-size: 1.2rem;
  white-space: pre-wrap !important;

  & h1 {
    line-height: 1.3;
  }

  direction: ${(props) => props.$direction};
  * {
    direction: ${(props) => props.$direction};
  }
`;

const StyledSiteCard = styled.div`
  padding: 0 10%;
  word-wrap: break-word;

  & * {
    margin: 0;
  }

  & .buttonsBox {
    & button:first-child {
      width: auto;
      height: 2rem;
    }
    & button {
      width: 2.5rem;
      height: 2.5rem;
      svg {
        font-size: 1.5rem;
      }
    }

    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  /* BELOW 590px */
  @media (max-width: 36.875em) {
    padding: 0;
  }
`;

const Post = () => {
  let { id } = useParams();
  let savedPost = getFromLocal(id);
  const [post, setPost] = useState(
    Date.now() - savedPost?.downloadedAt >= TIME_BEFORE_REFETCH_POST
      ? null
      : savedPost
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(
    // getFromLocal("bookmarks")?.some((bookId) => post?.id == bookId)
    getFromLocal("bookmarks")?.[post?.id]
  );
  const bodyRef = useRef(null);
  const [t, i] = useTranslation("global");
  const [postLang, setPostLang] = useState(i.language);

  const handleChange = (value) => {
    setPostLang(value);
  };

  // load post data from localStorage
  useEffect(() => {
    if (post) {
      setIsLoading(false);
      return;
    }

    async function init() {
      const a = await fetchData("posts", id);
      // console.log("fetching ", id);
      setPost(a);
      setIsLoading(false);
      saveToLocal(a.id, { ...a, downloadedAt: Date.now() });
    }
    init();
  }, [id, post]);

  if (isLoading) return <Loading />;
  if (!post)
    return (
      <Flex align="center" gap={"1rem"} justify="center">
        <p>{t("post.invalidId")}</p>
        <Button>
          <Link to="/archive">{t("post.return")}</Link>
        </Button>
      </Flex>
    );

  let decryptedBody = aCode(post.bodies[postLang], false);
  let decryptedTitle = aCode(post.titles[postLang], false);

  if (!decryptedBody || !decryptedTitle) return;

  return (
    <StyledSiteCard>
      <Card title={decryptedTitle} bordered={false}>
        <div className="buttonsBox">
          <Link to={`/archive`}>
            <Button type="primary">{t("post.return")}</Button>
          </Link>
          <Button
            shape="circle"
            icon={<Icon icon="ph:copy" />}
            title={t("post.copy")}
            onClick={() => {
              const postContent = getElementContent(
                document.querySelector(".ck-content")
              );

              const toCopy = `${window.location.origin}${window.location.pathname} \n\n ${decryptedTitle} \n\n ${postContent}`;
              navigator.clipboard.writeText(toCopy);

              bodyRef.current.innerHTML = decryptedBody; // links get corrupt, return it to normal
            }}
          />
          <Button
            shape="circle"
            icon={<Icon icon="solar:link-bold" />}
            title={t("post.link")}
            onClick={() => navigator.clipboard.writeText(window.location.href)}
          />
          <Button
            onClick={() => toggleSave(post.id, setIsBookmarked)}
            shape="circle"
            title={t("post.bookmark")}
            icon={
              <Icon
                icon={
                  isBookmarked ? "tabler:bookmark-filled" : "tabler:bookmark"
                }
              />
            }
          />
          <Select
            defaultValue={i.language}
            title={t("post.changeLang")}
            style={{
              width: 80,
            }}
            onChange={handleChange}
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

        <StyledBodyText
          ref={bodyRef}
          $direction={isTextStartsWithArabic(decryptedBody) ? "rtl" : "ltr"}
          dangerouslySetInnerHTML={{ __html: decryptedBody }}
          className="ck-content"
        />
        <p>
          {t("post.id")}:{" "}
          <strong>
            <Typography.Text mark>{post.id}</Typography.Text>
          </strong>
          <br />
          {t("post.author")}: <strong>{aCode(post.author, false)}</strong>
        </p>

        <Link to={`/archive`}>
          <Button type="primary">{t("post.return")}</Button>
        </Link>
      </Card>
      <Divider />
      <CommentSection postId={post.id} />
    </StyledSiteCard>
  );
};

export default Post;
