import { useState } from "react";
import Modal from "../ModalFooter/ModalFooter";
import { useAuth } from "../../hooks/useAuth";

import styles from "./Footer.module.css";
import clsx from "clsx";

const Footer = ({ style, sharedFooter }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const {theme} =useAuth() ; 

  const handleTextClick = () => {
    setModalOpen(true);
  };

  return (
    <footer
      style={style}
      className={clsx(
        styles.footer,
        sharedFooter === true ? styles.sharedFooter : null,
        theme === "light" || theme === "violet" ? styles.light : null
      )}>
      <div
        onClick={handleTextClick}
        className={clsx(
          styles.footerText,
          theme === "light" || theme === "violet" ? styles.lightText : null
        )}>
        <p>℗ & © Marketing_App</p>
        <p>Powered by Creative Infinity Team</p>
      </div>
     
      {modalOpen && <Modal closeModal={() => setModalOpen(false)} />}
    </footer>
  );
};

export default Footer;
