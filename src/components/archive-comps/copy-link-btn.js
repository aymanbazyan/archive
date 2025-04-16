"use client";

import { Icon } from "@iconify/react";
import { Btn } from "../antd-comps/antd-alt-for-caching";
import { useTranslations } from "next-intl";

function CopyLinkBtn() {
  const t = useTranslations("post");

  return (
    <Btn
      shape="circle"
      icon={<Icon icon="solar:link-bold" />}
      title={t("link")}
      onClick={() => {
        navigator.clipboard.writeText(window.location);
      }}
    />
  );
}

export default CopyLinkBtn;
