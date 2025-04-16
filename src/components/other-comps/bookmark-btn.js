"use client";
import { getFromLocal, toggleSave } from "@/helpers/functions";
import { Icon } from "@iconify/react";
import { Button } from "antd";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

function BookmarkBtn({ id }) {
  const t = useTranslations("post");
  const [isBookmarked, setIsBookmarked] = useState();
  useEffect(function () {
    setIsBookmarked(getFromLocal("bookmarks")?.some((i) => i == id));
  }, []);

  return (
    <Button
      title={t("bookmark")}
      onClick={() => toggleSave(id, setIsBookmarked)}
      shape="circle"
      icon={
        <Icon
          icon={isBookmarked ? "tabler:bookmark-filled" : "tabler:bookmark"}
          style={{ color: isBookmarked ? "#1890ff" : "#000" }}
        />
      }
    />
  );
}

export default BookmarkBtn;
