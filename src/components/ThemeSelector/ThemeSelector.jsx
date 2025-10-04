import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { updateTheme } from "../../redux/auth/operationsAuth";

import clsx from "clsx";

import { HiChevronDown, HiChevronUp } from "react-icons/hi";

import styles from "./ThemeSelector.module.css";

export default function ThemeSelector({ theme }) {
  const dispatch = useDispatch();

  const [themeA, setTheme] = useState(theme || "light");
  const [isOpen, setIsOpen] = useState(false); // Controls dropdown open/close

  const dropdownRef = useRef(null); // Ref for dropdown to detect clicks outside

  const handleSelect = (selectedTheme) => {
    setTheme(selectedTheme);
    dispatch(updateTheme(selectedTheme));

    setIsOpen(false); // Close the dropdown
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close dropdown if click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.selector} ref={dropdownRef}>
      {/* Display "Theme" when dropdown is closed */}
      <button
        className={styles.button}
        onClick={() => setIsOpen((prev) => !prev)}>
        <span
          className={clsx(
            styles.span,
            themeA === "dark" || themeA === "violet"
              ? styles.spanDark
              : styles.span
          )}>
          Theme
        </span>
        {!isOpen ? (
          <HiChevronDown
            className={clsx(
              styles.svg,
              themeA === "dark" || themeA === "violet"
                ? styles.svgDark
                : styles.svg
            )}
          />
        ) : (
          <HiChevronUp
            className={clsx(
              styles.svg,
              themeA === "dark" || themeA === "violet"
                ? styles.svgDark
                : styles.svg
            )}
          />
        )}
      </button>

      {/* Dropdown options */}
      {isOpen && (
        <ul
          className={clsx(
            styles.options,
            themeA === "dark" ? styles.optionsDark : styles.options,
            themeA === "violet" ? styles.optionsViolet : styles.options
          )}>
          {["light", "dark"].map((option) => (
            <li
              key={option}
              className={clsx(
                styles.option,
                themeA === "dark" ? styles.optionDark : styles.option,
                option === themeA &&
                  (themeA === "violet"
                    ? styles.activeOptionViolet
                    : styles.activeOption)
              )}
              onClick={() => handleSelect(option)}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

ThemeSelector.propTypes = {
  theme: PropTypes.string,
};
