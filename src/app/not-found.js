import { useTranslations } from "next-intl";
import Link from "next/link";

function NotFound() {
  const t = useTranslations("notFound");
  return (
    <html>
      <body>
        <div>
          <p>{t("title")}</p>
          <ul>
            <li>
              <Link href="/home">home</Link>
            </li>
            <li>
              <Link href="/archive">archive ({t("link")})</Link>
            </li>
            <li>
              <Link href="/bookmarks">bookmarks</Link>
            </li>
            <li>
              <Link href="/contact">contact</Link>
            </li>
          </ul>
        </div>
      </body>
    </html>
  );
}

export default NotFound;
