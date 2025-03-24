import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function AppWrapper({ children }) {
  const location = useLocation();
  const [lastPostId, setLastPostId] = useState(null);

  useEffect(() => {
    let curId = location.pathname.match(/\d+/)?.[0];
    if (lastPostId !== curId && curId) setLastPostId(curId);

    const intervalId = setInterval(() => {
      const el = document.getElementById(`post${lastPostId}`);

      //   console.log(el, lastPostId);
      if (el) {
        el.scrollIntoView();
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      clearInterval(intervalId);
    }, 100); // checks every 100ms

    return () => clearInterval(intervalId); // clean up on unmount
  }, [location.pathname, lastPostId]);

  return <div className="App">{children}</div>;
}

export default AppWrapper;
