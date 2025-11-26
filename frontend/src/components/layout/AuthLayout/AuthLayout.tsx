import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";
import Header from "../../theme/Header";

const AuthLayout = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.contentContainer}>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
