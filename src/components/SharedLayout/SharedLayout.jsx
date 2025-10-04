// import React, { useEffect, useState } from "react";
import React from "react";

import PropTypes from "prop-types";

// import { useMediaQuery } from "react-responsive";

import { Outlet } from "react-router-dom";

import Footer from "../Footer/Footer";
import Header from "../Header";

// import { useAuth } from "../../hooks/useAuth";
// import { usePrivate } from "../../hooks/usePrivate";

// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import clsx from "clsx";

import clsx from "clsx";

// import ScreenPage from "../../pages/ScreenPage";

// import { usePublic } from "../../hooks/usePublic";
// import { useDispatch } from "react-redux";

// import {
//   clearIsRegistered,
//   clearUpdateUser,
//   reset,
// } from "../../redux/auth/authSlice";
// import { resetHelpForm } from "../../redux/public/helpSlice";
// import { clearUser } from "../../redux/private/privateSlice";

import styles from "./SharedLayout.module.css";



function SharedLayout({ handleClick, handleRightClick, theme, lang }) {
  return (
    <div className={styles.cont}>
      <Header
        handleClick={handleClick}
        handleRightClick={handleRightClick}
        theme={theme}
        lang={lang}
      />

      <main
        className={clsx(
          styles.main,
          theme === "dark"
            ? styles.mainDark
            : theme === "violet"
            ? styles.mainViolet
            : theme === "light"
            ? styles.mainLight
            : styles.mainLight
        )}>
        <Outlet />
      </main>

      <Footer sharedFooter={true} />
    </div>
  );
}

SharedLayout.propTypes = {
  handleClick: PropTypes.func,
  handleRightClick: PropTypes.func,
  theme: PropTypes.oneOf(["light", "dark"]), // Theme options
  lang: PropTypes.string, // Language option
};

export default SharedLayout;
