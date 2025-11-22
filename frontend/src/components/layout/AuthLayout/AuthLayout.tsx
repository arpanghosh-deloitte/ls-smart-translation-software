import type { ReactNode } from "react";
import styles from "./AuthLayout.module.css";
import Header from "../../theme/Header";

type Props = { children: ReactNode };

const AuthLayout = ({ children }: Props) => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.fadeIn}>{children}</div>
    </div>
  );
};

export default AuthLayout;
