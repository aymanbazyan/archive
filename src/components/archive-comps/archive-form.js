"use client";

import Search from "antd/es/input/Search";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

function ArchiveForm({ defaultKeyword = "" }) {
  const router = useRouter();
  const t = useTranslations("archive");

  function onSubmit(k) {
    router.push(`/archive/?keyword=${k}`);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e.target[0].value);
      }}
    >
      <Search
        defaultValue={defaultKeyword}
        type="text"
        placeholder={t("searchHolder")}
        onSearch={onSubmit}
      />
    </form>
  );
}

export default ArchiveForm;
