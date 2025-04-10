"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import styles from "./comments-section.module.scss";
import { Avatar, Button, Flex, Form, List, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { COMMENT_MAX_LENGTH } from "@/helpers/config";
import { formatDateTime, isTextStartsWithArabic } from "@/helpers/functions";
import Text from "antd/es/typography/Text";
import { Icon } from "@iconify/react";
import Link from "antd/es/typography/Link";
import TextExpander from "./text-expander";

const CommentSection = ({ postId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function init() {
      try {
        setLoading(true);

        const res = await fetch("/api/auth/me");
        const { user } = await res.json();
        if (user) {
          setUser({
            name: user.user_metadata.email.split("@")[0],
            photoURL: user.user_metadata.avatar_url,
            uid: user.uid,
          });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  const [hideLoadMore, setHideLoadMore] = useState(false);
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState("Loading...");
  const [limit, setLimit] = useState(5);
  const t = useTranslations("comments");

  const handleSubmit = async () => {
    try {
      if (!value.trim()) return;
      const comment = {
        author: user.name,
        avatar: user.photoURL,
        content: value,
        // datetime: serverTimestamp(),
        id: crypto.randomUUID(),
        userId: user.uid,
      };
      setValue("");
      // await postComment(postId, comment);

      // temp to show
      comment.datetime = { seconds: Math.floor(Date.now() / 1000) };
      setComments((prev) => [comment, ...prev]);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <Spin />;
  return (
    <div
      // $direction={isTextStartsWithArabic(value)}
      className={styles.container}
    >
      <h2>{t("title")}</h2>
      {user && (
        <Form.Item>
          <TextArea
            maxLength={COMMENT_MAX_LENGTH}
            showCount
            rows={4}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={t("placeholder")}
            style={{
              marginBottom: "1rem",
              direction: isTextStartsWithArabic(value) ? "rtl" : "ltr",
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
                  {t("button")}
                </Button>
                {t("signed")}
                <Text type="success" strong>
                  {user.name}
                </Text>
              </Flex>

              <Button
                onClick={async () => {
                  const confirmed = confirm(t("logoutConfirm"));
                  if (!confirmed) return;

                  // Get current environment
                  const isProduction = false; //process.env.NODE_ENV === "production";

                  // Build cookie attributes string
                  const cookieSettings = [
                    "Path=/",
                    "SameSite=Lax",
                    `Max-Age=0`,
                    `Expires=${new Date(0).toUTCString()}`,
                    isProduction ? "Secure" : "",
                  ].join("; ");

                  // Delete cookies with exact same settings as creation
                  document.cookie = `sb-access-token=; ${cookieSettings}`;
                  document.cookie = `sb-refresh-token=; ${cookieSettings}`;

                  // Clear all browser storage
                  localStorage.clear();
                  sessionStorage.clear();

                  // Clear user state
                  setUser(null);

                  // Optional: Force reload to clear any in-memory state
                }}
                shape="circle"
                icon={<Icon icon="mdi:logout" width="20" height="20" />}
              />
            </Flex>
          ) : (
            <>
              {t("mustSign")}

              <Button
                onClick={async () => {
                  const res = await fetch("/api/auth/signWithGoogle");
                  const { googleUrl } = await res.json();
                  location.replace(googleUrl);
                }}
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
          comments.length <= 1 ? t("footerOne") : t("footerMany")
        }${comments.length === 0 ? t("footerNone") : ""}`}
        itemLayout="horizontal"
        renderItem={(item) => (
          <CustomComment item={item} userName={user.name} postId={postId} />
        )}
      />
      {comments.length >= 5 && !hideLoadMore && (
        <Button
          style={{ width: "fit-content" }}
          type="dashed"
          onClick={() => setLimit((prev) => prev + 5)}
        >
          {t("loadMore")}
        </Button>
      )}
    </div>
  );
};
export default CommentSection;

const CustomComment = ({ item, userName, postId }) => {
  const t = useTranslations("comments");

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
              expandButtonText={<Link>{t("showMore")}</Link>}
              collapseButtonText={<Link>{t("showLess")}</Link>}
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
