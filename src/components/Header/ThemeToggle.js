"use client";

import { Moon, Sun } from "react-feather";
import VisuallyHidden from "../VisuallyHidden";
import React from "react";
import { ThemeContext } from "../ThemeProvider";
import { Action } from "./Header.styled";

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = React.useContext(ThemeContext);

  return (
    <Action  onClick={toggleTheme}>
      {isDarkMode ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </Action>
  );
}

export default ThemeToggle;