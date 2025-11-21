import React from "react";
import styles from "./FullPageLoader.module.css";

const FullPageLoader: React.FC = () => (
  <div className={styles.overlay}>
    <div className={styles.spinner} />
  </div>
);

export default FullPageLoader;
