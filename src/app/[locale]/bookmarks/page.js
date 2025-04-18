"use client";
import { useLocale, useTranslations } from "next-intl";
import { Button, Spin } from "antd";
import Text from "antd/es/typography/Text";
import { Icon } from "@iconify/react";
import styles from "./page.module.scss";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toggleSave, getFromLocal } from "@/helpers/functions";

function BookmarksPage() {
  const t = useTranslations("bookmarks");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (ids) => {
    const res = await fetch(`/api/posts?ids=${ids}`);
    const posts = await res.json();
    return posts;
  }, []);

  useEffect(
    function () {
      async function init() {
        const ids = getFromLocal("bookmarks")?.join(",");
        if (!ids) return;
        setLoading(true);
        try {
          const posts = await fetchData(ids);
          setData(posts);
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      }
      init();
    },
    [fetchData]
  );

  const handleRemoveBookmark = (postId) => {
    toggleSave(postId, () => "");
    setData((prevData) =>
      prevData.map((post) =>
        post.id === postId ? { ...post, removed: "remove-pending" } : post
      )
    );
  };

  const handleUndoRemove = (postId) => {
    toggleSave(postId, () => "");
    setData((prevData) =>
      prevData.map((post) =>
        post.id === postId ? { ...post, removed: false } : post
      )
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.bookmarksList}>
        <div className={styles.bookmarksListHeader}>
          <span>{t("messageSaved")}</span>
          <span className={styles.count}>{data.length}</span>
        </div>

        {loading ? (
          <div className={styles.loadingState}>
            <Spin size="large" className={styles.spinner} />
            <div className={styles.message}>{t("loading")}</div>
          </div>
        ) : data.length === 0 ? (
          <div className={styles.emptyState}>
            <Icon icon="ph:bookmark-simple" className={styles.icon} />
            <div className={styles.message}>{t("noBookmarks")}</div>
          </div>
        ) : (
          <ul className={styles.bookmarksContent}>
            {data.map((post) => (
              <BookmarkItem
                key={post.id}
                post={post}
                onRemove={handleRemoveBookmark}
                onUndo={handleUndoRemove}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function BookmarkItem({ post, onRemove, onUndo }) {
  const locale = useLocale();
  const t = useTranslations("bookmarks");

  return (
    <li className={styles.bookmarkItem}>
      {post.removed === "remove-pending" ? (
        <div className={styles.removedState}>
          <span className={styles.removedText}>
            {t("post")} <span className={styles.highlight}>#{post.id}</span>{" "}
            {t("removed")}
          </span>
          <Button
            icon={<Icon icon="ci:undo" />}
            className={styles.undoButton}
            onClick={() => onUndo(post.id)}
          >
            Undo
          </Button>
        </div>
      ) : (
        <div className={styles.itemContent}>
          <div className={styles.itemHeader}>
            <span className={styles.itemId}>#{post.id}</span>
            <span className={styles.itemTitle}>{post.titles[locale]}</span>
          </div>

          <div className={styles.itemActions}>
            <Link href={`/archive/${post.id}`}>
              <Button
                type="default"
                shape="circle"
                className={styles.readButton}
                icon={<Icon icon="circum:read" width={20} />}
                title={t("readPost")}
              />
            </Link>
            <Button
              type="default"
              shape="circle"
              className={styles.deleteButton}
              icon={<Icon icon="tabler:trash" width={18} />}
              onClick={() => onRemove(post.id)}
              title={t("removeBookmark")}
            />
          </div>
        </div>
      )}
    </li>
  );
}

export default BookmarksPage;
