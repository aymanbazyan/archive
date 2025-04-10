"use client";
import { useLocale, useTranslations } from "next-intl";
import { Button, Flex, List } from "antd";
import AntdItem from "antd/es/list/Item";
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
    const psts = await res.json();
    return psts;
  });

  useEffect(function () {
    async function init() {
      const ids = getFromLocal("bookmarks")?.join(",");
      if (!ids) return;
      setLoading(true);
      try {
        const psts = await fetchData(ids);
        setData(psts);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  if (loading)
    return (
      <div className={styles.container}>
        <Text strong>{t("loading")}</Text>
      </div>
    );

  return (
    <div className={styles.container}>
      <List
        style={{ width: "30rem" }}
        header={
          <div>
            {t("messageSaved")} ({data.length})
          </div>
        }
        dataSource={data}
        bordered
        renderItem={(post) => <Item post={post} />}
      />
    </div>
  );
}

export default BookmarksPage;

function Item({ post }) {
  const i = useLocale();
  const t = useTranslations("bookmarks");
  const [removed, setRemoved] = useState(false);

  return (
    <AntdItem>
      {removed === "remove-pending" ? (
        <Flex justify="space-between" style={{ width: "100%" }}>
          <Text strong>
            {t("post")} <Text mark>#{post.id}</Text> {t("removed")}
          </Text>
          <Button
            icon={<Icon icon="ci:undo" />}
            variant="dashed"
            onClick={() => {
              toggleSave(post.id, () => "");
              setRemoved(false);
            }}
          >
            Undo
          </Button>
        </Flex>
      ) : (
        <>
          <Text mark>#{post.id}</Text> {post.titles[i]}{" "}
          <div
            style={{
              marginTop: ".7rem",
              display: "flex",
              gap: ".8rem",
              justifyContent: "space-between",
            }}
          >
            <Link href={`/archive/${post.id}`}>
              <Button
                shape="circle"
                icon={<Icon icon="circum:read" width={20} />}
              />
            </Link>
            <Button
              onClick={() => {
                toggleSave(post.id, () => "");
                setRemoved("remove-pending");
              }}
              shape="circle"
              icon={<Icon icon="tabler:trash" width={18} color="red" />}
            />
          </div>
        </>
      )}
    </AntdItem>
  );
}
