import React from "react";
import "react-toastify/dist/ReactToastify.css";

import ResetPaswwordForm from "../../components/ResetPaswwordForm";

import leftImage from "../../images/login-background-left-side.png";
import rightImage from "../../images/login-background-right-side.png";

import styles from "./ResetPasswordPage.module.css";

export default function ResetPasswordPage() {
  return (
    <section className={styles.section}>
      <div className={styles.imageLeft}>
        <img src={leftImage} alt="Left" />
      </div>
      <div className={styles.imageRight}>
        <img src={rightImage} alt="Right" />
      </div>
      <ResetPaswwordForm />
    </section>
  );
}
