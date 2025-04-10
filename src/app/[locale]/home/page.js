import { useTranslations } from "next-intl";
import styles from "./page.module.scss";
//import { seedFakePosts } from "@/lib/seedFakePosts";

function HomePage() {
  const t = useTranslations("home");

  return (
    <div className={styles.container}>
      <p>{t("head")}</p>
      <h3>{t("title")}</h3>
      <p>{t("body")}</p>
    </div>
  );
}

export default HomePage;
