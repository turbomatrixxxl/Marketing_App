import React from "react";
import { useAuth } from "../../hooks/useAuth";

import clsx from "clsx";

import styles from "./AdminPage.module.css";

export default function AdminPage() {
  const {theme} = useAuth();

  return (
    <div
      className={clsx(
        styles.cont,
        theme === "light"
          ? styles.lightCont
          : theme === "violet"
          ? styles.violetCont
          : styles.darkCont
      )}>
      AdminPage
    </div>
  );
}
