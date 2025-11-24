import styles from "./Header.module.css";
import React from "react"; // Best practice to import React

const Header: React.FC = () => {
  return (
    // 1. Semantic Tag: Keep <header>
    <header className={styles.header}>
      {/* 2. Logo/Branding: Use a proper tag for branding/link */}
      <h1 className={styles.logo}>
        Deloitte
        <span
          className={styles.dot}
          role="status"
          aria-label="System status indicator"
        ></span>
      </h1>

      <h1 className={styles.logo}>
        <span className={styles.appName}>Smart Translator App</span>
      </h1>
      {/* Additional navigation/user elements go here */}
      {/* Example: <nav className={styles.navLinks}>...</nav> */}
    </header>
  );
};

export default Header;
