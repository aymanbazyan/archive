import "./globals.scss";
import MainHeader from "@/components/other-comps/main-header";
import MainFooter from "@/components/other-comps/main-footer";
import { NextIntlClientProvider } from "next-intl";
import { metadata } from "@/helpers/config";
import "@ant-design/v5-patch-for-react-19";

export async function generateMetadata({ params }) {
  const lang = (await params).locale;

  return metadata[lang] || metadata.en;
}

export default async function LocaleLayout({ children, params }) {
  const lang = (await params).locale;
  const direction = lang === "ar" || lang === "he" ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={direction}>
      <body>
        <NextIntlClientProvider>
          <div className="app">
            <div>
              <MainHeader />
              {children}
            </div>
            <MainFooter />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
