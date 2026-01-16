import styles from './Footer.module.css';
import React from 'react';

const Footer: React.FC = () => {
    // Get current year dynamically to prevent stale copyright dates
    const currentYear = new Date().getFullYear(); 

    return (
        <footer className={styles.footer} role="contentinfo">
            <span className={styles.footerText}>
                © {currentYear} Deloitte Smart Translator. All rights reserved.
            </span>
        </footer>
    );
};

export default Footer;