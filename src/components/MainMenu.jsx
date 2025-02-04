import { useEffect, useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { saveToLocal } from "../helpers/helpers";
import { Icon } from "@iconify/react/dist/iconify.js";
import { LANGUAGES } from "../helpers/config";

const MainMenu = ({ setTheme, theme }) => {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname.split("/")[1]);
  const [t, i] = useTranslation("global");

  useEffect(() => {
    setCurrent(location.pathname.split("/")[1]);
  }, [location]);

  const handleMenu = (e) => {
    if (e.key === "changeTheme") return;
    if (e.keyPath[1] === "changeLang") {
      i.changeLanguage(e.key);
      saveToLocal("lang", e.key);
      window.location.reload();
    }
    setCurrent(e.key);
  };

  const menuItems = [
    {
      label: <Link to="/home">{t("header.main")}</Link>,
      key: "home",
    },
    {
      label: <Link to="/archive">{t("header.archive")}</Link>,
      key: "archive",
    },
    {
      label: <Link to="/bookmarks">{t("header.bookmarks")}</Link>,
      key: "bookmarks",
    },
    {
      label: <Link to="/contact">{t("header.contact")}</Link>,
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
          icon={theme === "dark" ? "uil:moon" : "uil:sun"}
          width="1.3rem"
          height="1.3rem"
        />
      ),
      key: "changeTheme",
      onClick: () => setTheme(() => (theme === "dark" ? "light" : "dark")),
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
      onClick={handleMenu}
      selectedKeys={[current]}
      mode="horizontal"
      // theme="dark"
      items={menuItems}
    />
  );
};

export default MainMenu;
