"use client";
import { useReadingProgress } from "../../hooks/useReadingProgress";
import styles from "./reading-bar.module.scss";

export default function ReadingBar() {
  const completion = useReadingProgress();
  return (
    <nav className={styles.nav}>
      <span
        style={{
          transform: `translateX(${completion - 100}%)`,
        }}
        completion={completion}
        id="progress-bar"
      />
      {/* Rest of the NavBar */}
    </nav>
  );
}
