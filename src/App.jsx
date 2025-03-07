import { Suspense, lazy, useEffect, useState } from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Loading from "./components/Loading";
import { DEFAULT_POSTS_NUM, LANGUAGES } from "./helpers/config";
import { createGlobalStyle } from "styled-components";
import { getFromLocal, saveToLocal } from "./helpers/helpers";
import {
  enable as enableDarkMode,
  disable as disableDarkMode,
  setFetchMethod,
} from "darkreader";

const MainMenu = lazy(() => import("./components/MainMenu"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Archive = lazy(() => import("./pages/Archive"));
const Contact = lazy(() => import("./pages/Contact"));
const Post = lazy(() => import("./pages/Post"));
const Home = lazy(() => import("./pages/Home"));
const Bookmarks = lazy(() => import("./pages/Bookmarks"));
import AppWrapper from "./components/AppWrapper";
import Footer from "./components/Footer";

import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

import global_en from "./translations/en/global.json";
import global_ar from "./translations/ar/global.json";
import ReadingBar from "./components/ReadingBar";
const globalTranslations = {
  ar: global_ar,
  en: global_en,
};

let userLang = getFromLocal("lang");

if (!userLang) {
  const newLang = "en";
  saveToLocal("lang", newLang);
  userLang = newLang;
}

const languagesObj = {};
LANGUAGES.map(
  (lan) =>
    (languagesObj[lan.key] = {
      global: globalTranslations[lan.key] || global_en,
    })
);

i18next.init({
  interpolation: { escapeValue: false },
  lng: userLang,
  resources: languagesObj, //{ en: { global: global_en }, ar: { global: global_ar } },
});

const UniversalStyle = createGlobalStyle`
* {
direction: ${userLang === "ar" || userLang === "he" ? "rtl" : "ltr"};
}
`;

function App() {
  const [loadNum, setLoadNum] = useState(DEFAULT_POSTS_NUM);

  // Theme stuff
  const [theme, setTheme] = useState(
    getFromLocal("theme") === "dark" ? "dark" : "light"
  );
  useEffect(
    function () {
      if (theme === "light") {
        disableDarkMode();
      } else {
        setFetchMethod(window.fetch); // Set fetch method for Darkreader
        enableDarkMode({
          brightness: 100,
          contrast: 100,
          sepia: 0,
        });
      }

      saveToLocal("theme", theme);
    },
    [theme]
  );

  return (
    <I18nextProvider i18n={i18next}>
      <UniversalStyle />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <AppWrapper>
            <div>
              <MainMenu theme={theme} setTheme={setTheme} />
              <Routes>
                <Route path="/home" element={<Home />} />

                <Route path="/" element={<Navigate to={"/archive"} />} />
                <Route
                  path="/archive"
                  element={
                    <Archive loadNum={loadNum} setLoadNum={setLoadNum} />
                  }
                />

                <Route
                  path="/archive/:id"
                  element={
                    <>
                      <ReadingBar />
                      <Post />
                    </>
                  }
                />
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
