import { useEffect, useState } from "react";
import { Avatar, Form, Button, List, Input, Flex, Typography } from "antd";
const { TextArea } = Input;
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  auth,
  deleteComment,
  fetchSubData,
  postComment,
  serverTimestamp,
  signInWithGoogle,
  signOutAuth,
} from "../features/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { formatDateTime, isTextStartsWithArabic } from "../helpers/helpers";
import { COMMENT_MAX_LENGTH } from "../helpers/config";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Link from "antd/es/typography/Link";
import TextExpander from "./TextExpander";

const StyledContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;

  & textarea {
    direction: ${(a) => (a.$direction ? "rtl" : "ltr")} !important;
  }

  display: grid;
  gap: 1rem;

  & .contentBox {
    justify-self: baseline;
    white-space: break-spaces !important;
  }
`;

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState("Loading...");
  const [limit, setLimit] = useState(5);
  const name = user?.email?.split("@")[0];
  const [t] = useTranslation("global");
  const [hideLoadMore, setHideLoadMore] = useState(false);

  useEffect(function () {
    const unSub = onAuthStateChanged(auth, async (loggedUser) => {
      try {
        setLoading("Loading...");
        setUser(loggedUser);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    });

    return () => unSub();
  }, []);

  useEffect(
    function () {
      async function init() {
        try {
          // setLoading("Loading...");
          const newComments = await fetchSubData(postId, limit);
          if (newComments.length - comments.length < 5) setHideLoadMore(true);

          // Use a set-like behavior to avoid duplicates
          const uniqueComments = [
            ...new Map(
              [...comments, ...newComments].map((item) => [item.id, item])
            ).values(),
          ];

          setComments(uniqueComments);
        } catch (err) {
          console.log(err);
        } finally {
          // setLoading("");
        }
      }
      init();
    },
    [postId, limit]
  );

  const handleSubmit = async () => {
    try {
      if (!value.trim()) return;
      const comment = {
        author: name,
        avatar: user.photoURL,
        content: value,
        datetime: serverTimestamp(),
        id: crypto.randomUUID(),
        userId: user.uid,
      };
      setValue("");
      await postComment(postId, comment);

      // temp to show
      comment.datetime = { seconds: Math.floor(Date.now() / 1000) };
      setComments((prev) => [comment, ...prev]);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <p>{loading}</p>;
  return (
    <StyledContainer $direction={isTextStartsWithArabic(value)}>
      <h2>{t("comments.title")}</h2>
      {user && (
        <Form.Item>
          <TextArea
            maxLength={COMMENT_MAX_LENGTH}
            showCount
            rows={4}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={t("comments.placeholder")}
            style={{
              marginBottom: "1rem",
            }}
          />
        </Form.Item>
      )}
      <Form.Item>
        <Flex align="center" gap={".5rem"} wrap={"wrap"}>
          {user ? (
            <Flex
              gap={".5rem"}
              justify={"space-between"}
              wrap={"wrap"}
              style={{ width: "100%" }}
            >
              <Flex gap={".5rem"} align={"center"} wrap={"wrap"}>
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  disabled={!value.trim()}
                >
                  {t("comments.button")}
                </Button>
                {t("comments.signed")}
                <Typography.Text type="success" strong>
                  {name}
                </Typography.Text>
              </Flex>

              <Button
                onClick={async () => {
                  const confirmed = confirm(t("comments.logoutConfirm"));
                  if (!confirmed) return;
                  await signOutAuth();
                }}
                shape="circle"
                icon={<Icon icon="mdi:logout" width="20" height="20" />}
              />
            </Flex>
          ) : (
            <>
              {t("comments.mustSign")}

              <Button
                onClick={signInWithGoogle}
                shape="circle"
                icon={
                  <Icon icon="flat-color-icons:google" width="20" height="20" />
                }
              />
            </>
          )}
        </Flex>
      </Form.Item>

      <List
        dataSource={comments}
        header={`${comments.length} ${
          comments.length <= 1
            ? t("comments.footerOne")
            : t("comments.footerMany")
        }${comments.length === 0 ? t("comments.footerNone") : ""}`}
        itemLayout="horizontal"
        renderItem={(item) => (
          <CustomComment item={item} userName={name} postId={postId} />
        )}
      />
      {comments.length >= 5 && !hideLoadMore && (
        <Button
          style={{ width: "fit-content" }}
          type="dashed"
          onClick={() => setLimit((prev) => prev + 5)}
        >
          {t("comments.loadMore")}
        </Button>
      )}
    </StyledContainer>
  );
};

export default CommentSection;

const CustomComment = ({ item, userName, postId }) => {
  const [t] = useTranslation("global");

  return (
    <div
      style={{
        marginBottom: "16px",
        marginTop: "10px",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "1rem" }}>
          <div>
            <Avatar src={item.avatar} alt={item.author} />
          </div>
          <div>
            <div style={{ marginBottom: "4px", display: "flex", gap: ".5rem" }}>
              <strong>{item.author}</strong>{" "}
              <span style={{ color: "var(--color-gray)", lineHeight: 1.2 }}>
                {formatDateTime(item?.datetime?.seconds * 1000)}
              </span>
            </div>
            <TextExpander
              collapsedNumLetters={50}
              expandButtonText={<Link>{t("comments.showMore")}</Link>}
              collapseButtonText={<Link>{t("comments.showLess")}</Link>}
              className="contentBox"
              styles={{
                direction: isTextStartsWithArabic(item?.content)
                  ? "rtl"
                  : "ltr",
              }}
              color="var(--color-main)"
            >
              {item.content}
            </TextExpander>
          </div>
        </div>

        <div>
          {item.author === userName && (
            // true
            <Button
              onClick={async () => {
                const submit = confirm("Are you sure?");
                if (!submit) return;

                await deleteComment(postId, item.id);

                // setComments((prevComments) =>
                //   prevComments.filter((comment) => comment.id !== item.id)
                // );
                location.reload();
              }}
              shape="circle"
              icon={<Icon icon="tabler:trash" width="23" height="23" />}
            />
          )}
        </div>
      </div>
    </div>
  );
};
