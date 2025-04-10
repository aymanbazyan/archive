"use client";
import { useState } from "react";

const darkModeConfig = { brightness: 100, contrast: 100, sepia: 0 };

export function useDarkMode() {
  const [darkEnabled, setDarkEnabled] = useState(false);

  // useEffect(() => {
  //   // Ensure this runs only in the browser
  //   if (typeof window !== "undefined") {
  //     // Delay DarkReader to ensure hydration completes first
  //     import("darkreader").then(({ enable, isEnabled, setFetchMethod }) => {
  //       setFetchMethod(window.fetch); // Move inside the then block to prevent SSR errors
  //       if (!isEnabled()) {
  //         enable(darkModeConfig);
  //         setDarkEnabled(true);
  //       }
  //     });
  //   }
  // }, []);

  const toggleDarkMode = async () => {
    const { enable, disable, isEnabled } = await import("darkreader");
    if (isEnabled()) {
      disable();
      setDarkEnabled(false);
    } else {
      enable(darkModeConfig);
      setDarkEnabled(true);
    }
  };

  return { darkEnabled, toggleDarkMode };
}
