import { Suspense, lazy, useState } from "react";
import { Layout } from "antd";
const { Header } = Layout;
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import { DEFAULT_POSTS_NUM } from "./helpers/config";
import { createGlobalStyle } from "styled-components";

const MainMenu = lazy(() => import("./components/MainMenu"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Archive = lazy(() => import("./pages/Archive"));
const Contact = lazy(() => import("./pages/Contact"));
const Post = lazy(() => import("./pages/Post"));
const Home = lazy(() => import("./pages/Home"));
const Bookmarks = lazy(() => import("./pages/Bookmarks"));
import Footer from "./components/Footer";

import global_en from "./translations/en/global.json";
import global_ar from "./translations/ar/global.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { getFromLocal, saveToLocal } from "./helpers/helpers";
import AppWrapper from "./components/AppWrapper";

let userLang = getFromLocal("lang");
if (!userLang) {
  let newLang =
    navigator.language || navigator.userLanguage.slice(0, 2).toLowerCase();
  saveToLocal("lang", newLang);
  userLang = newLang;
}

if (userLang !== "en" && userLang !== "ar") {
  const newLang = "en";
  saveToLocal("lang", newLang);
  userLang = newLang;
}

i18next.init({
  interpolation: { escapeValue: false },
  lng: userLang,
  resources: { en: { global: global_en }, ar: { global: global_ar } },
});

const UniversalStyle = createGlobalStyle`
* {
direction: ${userLang === "ar" || userLang === "he" ? "rtl" : "ltr"};
}
`;

function App() {
  const [loadNum, setLoadNum] = useState(DEFAULT_POSTS_NUM);

  return (
    <I18nextProvider i18n={i18next}>
      <UniversalStyle />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <AppWrapper>
            <div>
              <Header>
                <MainMenu />
              </Header>
              <Routes>
                <Route index element={<Home />} />

                <Route
                  path="/archive"
                  element={
                    <Archive loadNum={loadNum} setLoadNum={setLoadNum} />
                  }
                />
                <Route path="/archive/:id" element={<Post />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/bookmarks" element={<Bookmarks />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>

            <Footer />
          </AppWrapper>
        </Suspense>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
