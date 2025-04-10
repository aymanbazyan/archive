"use client";

import Link from "next/link";
import { LANGUAGES } from "@/helpers/config";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useDarkMode } from "@/hooks/useDarkMode";

function MainHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("header");
  const { darkEnabled, toggleDarkMode } = useDarkMode();

  const menuItems = [
    {
      label: <Link href="/home">{t("main")}</Link>,
      key: "home",
    },
    {
      label: <Link href="/archive">{t("archive")}</Link>,
      key: "archive",
    },
    {
      label: <Link href="/bookmarks">{t("bookmarks")}</Link>,
      key: "bookmarks",
    },
    {
      label: <Link href="/contact">{t("contact")}</Link>,
      key: "contact",
    },
    {
      label: (
        <Icon
          style={{
            padding: ".5rem",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
          icon="material-symbols:language"
          width="1.2rem"
          height="1.2rem"
        />
      ),
      key: "changeLang",
      children: LANGUAGES,
      onClick: (e) => {
        const parts = pathname.split("/");
        // console.log(parts);
        parts[1] = e.key;
        const path = parts.join("/");
        router.push(path);
        window.location.reload(); // so that navigating between pages after changing languages wont cause to revert the language
      },
    },
    {
      label: (
        <Icon
          style={{
            padding: ".5rem",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
          icon={darkEnabled === "dark" ? "uil:moon" : "uil:sun"}
          width="1.3rem"
          height="1.3rem"
        />
      ),
      key: "changeTheme",
      onClick: toggleDarkMode, //setTheme(() => (theme === "dark" ? "light" : "dark")),
    },
  ];

  return (
    <Menu
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
      //   onClick={handleMenu}
      mode="horizontal"
      selectedKeys={[pathname.split("/")[2]]}
      items={menuItems}
    />
  );
}

export default MainHeader;
