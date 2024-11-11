import { Button, List, Typography } from "antd";
import {
  aCode,
  getFromLocal,
  saveToLocal,
  toggleSave,
} from "../helpers/helpers";
import { memo, useEffect, useState } from "react";
import { fetchData } from "../features/firebase";
import { TIME_BEFORE_REFETCH_POST } from "../helpers/config";
import Loading from "../components/Loading";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const StyledContainer = styled.div`
  padding: 1rem 10%;
  /* width: 80rem; */

  display: flex;
  justify-content: center;

  & .ant-list {
    width: 100%;
    max-width: 30rem;
  }
`;

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState(getFromLocal("bookmarks") || {});
  const data = Object.values(bookmarks).map((book) => book);
  const [t] = useTranslation("global");

  return (
    <StyledContainer>
      <List
        header={
          <div>
            {t("bookmarks.messageSaved")} ({data.length})
          </div>
        }
        dataSource={data}
        bordered
        renderItem={(id) => <Item id={id} setBookmarks={setBookmarks} />}
      />
    </StyledContainer>
  );
}

export default Bookmarks;

const Item = memo(function Item({ id, setBookmarks }) {
  const navigate = useNavigate();
  let savedPost = getFromLocal(id);
  const [post, setPost] = useState(
    Date.now() - savedPost?.downloadedAt >= TIME_BEFORE_REFETCH_POST
      ? null
      : savedPost
  );
  const [isLoading, setIsLoading] = useState(true);
  const [, i] = useTranslation("global");

  // load post data from localStorage
  useEffect(() => {
    if (post) {
      setIsLoading(false);
      return;
    }

    async function init() {
      const a = await fetchData("posts", id);
      setPost(a);
      setIsLoading(false);
      saveToLocal(a.id, { ...a, downloadedAt: Date.now() });
    }
    init();
  }, [id, post]);

  if (isLoading) return <Loading />;
  if (!post) return;

  return (
    <List.Item>
      <Typography.Text mark>{id}</Typography.Text>{" "}
      {aCode(post.titles[i.language], false)}{" "}
      <div style={{ marginTop: ".7rem", display: "flex", gap: ".2rem" }}>
        <Button
          onClick={() => navigate(`/archive/${id}`)}
          shape="circle"
          icon={<Icon icon="circum:read" />}
        />
        <Button
          onClick={() => {
            toggleSave(id, () => "");
            const updatedBooks = getFromLocal("bookmarks");
            delete updatedBooks[id];
            setBookmarks(updatedBooks);
          }}
          shape="circle"
          icon={<Icon icon="tabler:bookmark-filled" />}
        />
      </div>
    </List.Item>
  );
});
