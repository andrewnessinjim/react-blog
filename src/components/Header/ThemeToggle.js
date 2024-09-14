"use client";

import { Moon, Sun } from "react-feather";
import VisuallyHidden from "../VisuallyHidden";
import headerStyles from "./Header.module.css";
import React from "react";
import { ThemeContext } from "../ThemeProvider";

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = React.useContext(ThemeContext);

  return (
    <button className={headerStyles.action} onClick={toggleTheme}>
      {isDarkMode ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </button>
  );
}

export default ThemeToggle;
