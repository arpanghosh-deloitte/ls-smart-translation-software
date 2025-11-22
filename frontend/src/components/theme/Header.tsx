import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <span className={styles.logo}>Deloitte</span>
      <span className={styles.dot}></span>
    </header>
  );
};

export default Header;
