import { useEffect, useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { saveToLocal } from "../helpers/helpers";
import { Icon } from "@iconify/react/dist/iconify.js";

const MainMenu = () => {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname.split("/")[1]);
  const [t, i] = useTranslation("global");

  useEffect(() => {
    setCurrent(location.pathname.split("/")[1]);
  }, [location]);

  const handleMenu = (e) => {
    if (e.keyPath[1] === "changeLang") {
      i.changeLanguage(e.key);
      saveToLocal("lang", e.key);
      window.location.reload();
    }
    setCurrent(e.key);
  };

  const menuItems = [
    {
      label: <Link to="/">{t("header.main")}</Link>,
      key: "",
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
      icon: (
        <Icon icon="material-symbols:language" width="1.2em" height="1.2em" />
      ),
      key: "changeLang",
      children: [
        {
          key: "en",
          label: "English",
        },
        {
          key: "ar",
          label: "العربية",
        },
      ],
    },
  ];

  return (
    <Menu
      onClick={handleMenu}
      selectedKeys={[current]}
      mode="horizontal"
      theme="dark"
      items={menuItems}
    />
  );
};

export default MainMenu;
