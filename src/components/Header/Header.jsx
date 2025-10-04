import React, { useState } from "react";
import PropTypes from "prop-types";

import { useMediaQuery } from "react-responsive";

import { useAuth } from "../../hooks/useAuth";

import clsx from "clsx";

import { FaCog } from "react-icons/fa";

import ThemeSelector from "../ThemeSelector/ThemeSelector";
import LanguageSelector from "../LanguageSelector/LanguageSelector";

import UpdateUser from "../modal/UpdateUser/UpdateUser";

import smartImage from "../../images/smart1Edited.jpg";

import styles from "./Header.module.css";

const breakpoints = {
  mobile: "(max-width: 767px)",
  tablet: "(min-width:768px)",
  desktop: "(min-width:1115px)",
};

function Header({ handleClick, handleRightClick, theme, lang }) {
  const { user, avatarURL } = useAuth();

  const [isUpdateUserModalVisible, setIsUpdateUserModalVisible] =
    useState(false);

  const handleOpenUpdateModal = () => {
    setIsUpdateUserModalVisible(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateUserModalVisible(false);
  };

  // const imageUrl = avatarURL?.startsWith("http")
  // ? avatarURL
  //   : `https://taskpro-nodejs.onrender.com/${avatarURL}`;

  const imageUrl = avatarURL?.startsWith("http")
    ? avatarURL
    : `http://localhost:5000/${avatarURL}`;

  const isMobile = useMediaQuery({ query: breakpoints.mobile });
  const isTablet = useMediaQuery({ query: breakpoints.tablet });
  const isDesktop = useMediaQuery({ query: breakpoints.desktop });

  const [hover, setHover] = useState(false);

  return (
    <>
      {isUpdateUserModalVisible && (
        <UpdateUser
          theme={theme}
          user={user}
          onClose={handleCloseUpdateModal}
        />
      )}
      <header
        className={clsx(
          styles.header,
          theme === "dark"
            ? styles.headerDark
            : theme === "violet"
            ? styles.headerViolet
            : theme === "light"
            ? styles.headerLight
            : styles.headerLight
        )}>
        {isMobile && (
          <button onClick={handleClick} className={styles.hamButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}>
              <path
                d="M3 12H21"
                stroke={
                  hover
                    ? "var(--brand-color)"
                    : clsx(
                        theme === "dark" || theme === "violet"
                          ? "rgba(255, 255, 255, 0.8)"
                          : "#161616"
                      )
                }
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 6H21"
                stroke={
                  hover
                    ? "var(--brand-color)"
                    : clsx(
                        theme === "dark" || theme === "violet"
                          ? "rgba(255, 255, 255, 0.8)"
                          : "#161616"
                      )
                }
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 18H21"
                stroke={
                  hover
                    ? "var(--brand-color)"
                    : clsx(
                        theme === "dark" || theme === "violet"
                          ? "rgba(255, 255, 255, 0.8)"
                          : "#161616"
                      )
                }
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {isTablet && !isDesktop && (
          <button onClick={handleClick} className={styles.hamButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}>
              <path
                d="M4 16H28"
                stroke={
                  hover
                    ? "var(--brand-color)"
                    : clsx(
                        theme === "dark" || theme === "violet"
                          ? "rgba(255, 255, 255, 0.8)"
                          : "#161616"
                      )
                }
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 8H28"
                stroke={
                  hover
                    ? "var(--brand-color)"
                    : clsx(
                        theme === "dark" || theme === "violet"
                          ? "rgba(255, 255, 255, 0.8)"
                          : "#161616"
                      )
                }
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 24H28"
                stroke={
                  hover
                    ? "var(--brand-color)"
                    : clsx(
                        theme === "dark" || theme === "violet"
                          ? "rgba(255, 255, 255, 0.8)"
                          : "#161616"
                      )
                }
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        <LanguageSelector theme={theme} lang={lang} />
        <ThemeSelector theme={theme} />

        {isTablet && (
          <div className={styles.logoSection}>
            <img
              className={styles.cBotAvatar}
              src={smartImage}
              alt="cBot avatar"
            />
            <p
              style={{ fontSize: "16px", fontWeight: "bold" }}
              className={
                theme === "dark" || theme === "violet"
                  ? styles.userName
                  : styles.userNameLight
              }>
              Smart Marketing
            </p>
          </div>
        )}

        <div className={styles.rightContainer}>
          <div
            className={clsx(
              styles.userContainer,
              theme === "dark" ? styles.userContainerDark : styles.userContainer
            )}>
            <p
              className={
                theme === "dark" || theme === "violet"
                  ? styles.userName
                  : styles.userNameLight
              }
              onClick={handleOpenUpdateModal}>
              <FaCog
                size={14}
                color={
                  theme === "dark" || theme === "violet"
                    ? "rgba(255, 255, 255, 0.8)"
                    : "#161616cc"
                }
                className={styles.cogIcon}
              />
              {user?.username || "User"}
            </p>

            <img
              className={clsx(
                styles.image,
                theme === "violet" ? styles.imgViolet : styles.img
              )}
              src={imageUrl || smartImage}
              alt="User Avatar"
              // style={{ width: "42px", height: "42px", borderRadius: "50%" }}
            />
          </div>
        </div>

        {isMobile && (
          <button onClick={handleRightClick} className={styles.hamButton}>
            <FaCog
              size={24}
              color={
                theme === "dark" || theme === "violet"
                  ? "rgba(255, 255, 255, 0.8)"
                  : "#161616cc"
              }
              className={styles.cogIcon}
            />
          </button>
        )}

        {isTablet && !isDesktop && (
          <button onClick={handleRightClick} className={styles.hamButton}>
            <FaCog
              size={32}
              color={
                theme === "dark" || theme === "violet"
                  ? "rgba(255, 255, 255, 0.8)"
                  : "#161616cc"
              }
              className={styles.cogIcon}
            />
          </button>
        )}
      </header>
    </>
  );
}

Header.propTypes = {
  handleClick: PropTypes.func,
  handleRightClick: PropTypes.func,
  theme: PropTypes.oneOf(["light", "dark"]), // Theme options
};

export default Header;
