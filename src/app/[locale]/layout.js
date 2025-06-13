import "./globals.scss";
import MainHeader from "@/components/other-comps/main-header";
import MainFooter from "@/components/other-comps/main-footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server"; // Helper to get messages on the server
import { metadata as metadataConfig } from "@/helpers/config";
import "@ant-design/v5-patch-for-react-19";

// This function correctly generates metadata for the page
export async function generateMetadata({ params: { locale } }) {
  // Use the metadata from your config file, with a fallback to 'en'
  return metadataConfig[locale] || metadataConfig.en;
}

export default async function LocaleLayout({ children, params: { locale } }) {
  // Set text direction based on language
  const direction = locale === "ar" || locale === "he" ? "rtl" : "ltr";

  // 1. Get messages for the current locale for NextIntlClientProvider
  const messages = await getMessages();

  return (
    // The <html> tag is correct here in the root layout
    <html lang={locale} dir={direction}>
      <body>
        {/* 2. Pass locale and messages to the provider */}
        <NextIntlClientProvider locale={locale} messages={messages}>
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
