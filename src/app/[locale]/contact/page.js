import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import styles from "./page.module.scss";
import { facebookLink, LOGO_URL, telegramLink } from "@/helpers/config";
import Image from "next/image";
// import CommentSection from "@/components/other-comps/comments-section";
// import { Suspense } from "react";

function ContactPage() {
  const t = useTranslations("contact");

  return (
    <div>
      <ul className={styles.list}>
        <li>
          <a>
            <Icon icon="bi:facebook" />
            <p>{facebookLink ? facebookLink : t("messageUnavailable")}</p>
          </a>
        </li>
        <li>
          <a>
            <Icon icon="bi:telegram" />
            <p>{telegramLink ? telegramLink : t("messageUnavailable")}</p>
          </a>
        </li>

        <Image src={LOGO_URL} width={200} height={120} alt="logo" />
        {/* <Suspense fallback={<p>...</p>}>
          <CommentSection postId="general" />
        </Suspense> */}
      </ul>

      {/* to do
      <li>1. search archive pagination ✅</li>
      <li>2. comments section</li>
      <li>3. dark mode ✅</li>
      <li>4. create post logic</li>
      <li>5. change favicon</li>
      <li>
        6. changing config and messages.json for public and write readme.md and
        write all new changes
      </li>
      <li>7. also test caching in production mode (npm build, npm start)</li>
      */}
    </div>
  );
}

export default ContactPage;
