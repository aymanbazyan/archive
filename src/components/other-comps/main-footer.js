import { Footer } from "antd/es/layout/layout";
import { useTranslations } from "next-intl";

function MainFooter() {
  const t = useTranslations("footer");
  return <Footer>{t("message")}</Footer>;
}

export default MainFooter;
