import React from "react";
import styles from "./Footer.module.css";
import {  Typography } from "@mui/material";
const Footer: React.FC = () =>{
  return(
    <footer className={styles.footer}>
 <Typography variant="body2" sx={{ fontWeight: 600, color: "white" }}>
            © {new Date().getFullYear()} Deloitte Smart Translator. All rights
            reserved.
          </Typography>
    </footer>
  )
}

export default Footer;