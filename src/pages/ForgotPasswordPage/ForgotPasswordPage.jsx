import React from "react";
import "react-toastify/dist/ReactToastify.css";

import ForgotPasswordForm from "../../components/ForgotPasswordForm";

import leftImage from "../../images/login-background-left-side.png";
import rightImage from "../../images/login-background-right-side.png";

import styles from "./ForgotPasswordPage.module.css";

export default function ForgotPasswordPage() {
  return (
    <section className={styles.section}>
      <div className={styles.imageLeft}>
        <img src={leftImage} alt="Left" />
      </div>
      <div className={styles.imageRight}>
        <img src={rightImage} alt="Right" />
      </div>
      <ForgotPasswordForm />
    </section>
  );
}
