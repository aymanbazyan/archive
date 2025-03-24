import { Layout } from "antd";
const { Footer } = Layout;
import { useTranslation } from "react-i18next";

function FooterComp() {
  const [t] = useTranslation("global");

  return <Footer>{t("footer.message")}</Footer>;
}

export default FooterComp;
