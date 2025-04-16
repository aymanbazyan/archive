"use client";
import { Icon } from "@iconify/react";
import { Btn } from "../antd-comps/antd-alt-for-caching";
import { useTranslations } from "next-intl";
import { getElementContent } from "@/helpers/functions";

function CopyPostBtn({ title = "" }) {
  const t = useTranslations("post");

  return (
    <Btn
      shape="circle"
      icon={<Icon icon="ph:copy" />}
      title={t("copy")}
      onClick={() => {
        const postContent = getElementContent(
          document.querySelector(".ck-content")
        );

        const toCopy = `${window.location.origin}${window.location.pathname} \n\n ${title} \n\n ${postContent}`;
        navigator.clipboard.writeText(toCopy);

        // bodyRef.current.innerHTML = decryptedBody; // links get corrupt, return it to normal
      }}
    />
  );
}

export default CopyPostBtn;
