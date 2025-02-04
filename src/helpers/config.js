export const DEFAULT_POSTS_NUM = 10;
export const POST_SHOWCASE_LENGTH = 150;
export const TIME_BEFORE_REFETCH_POST = 86400000; // 1DAY
export const COMMENT_MAX_LENGTH = 500;
export const LANGUAGES = [
  {
    key: "en",
    label: "English",
  },
  {
    key: "ar",
    label: "العربية",
  },
  // when you add something, edit globalTranslations in App.jsx
];

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};
