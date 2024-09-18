import { useEffect, useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import SelectLanguage from "./SelectLanguage";

const MainMenu = () => {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname.split("/")[1]);
  const [t] = useTranslation("global");

  useEffect(() => {
    setCurrent(location.pathname.split("/")[1]);
  }, [location]);

  const handleMenu = (e) => {
    if (e.key === "changeLang") return;
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
      label: <SelectLanguage />,
      key: "changeLang",
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
