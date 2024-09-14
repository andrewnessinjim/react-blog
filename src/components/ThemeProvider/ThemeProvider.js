"use client";

import React from "react";
import Cookie from 'js-cookie';
import { THEME_COOKIE_NAME } from "@/constants";

export const ThemeContext = React.createContext();

function ThemeProvider({ children, initialTheme }) {
  const [theme, setTheme] = React.useState(initialTheme);

  const isDarkMode = theme === "dark";

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";

    Cookie.set(THEME_COOKIE_NAME, nextTheme, {
      expires: 1000
    });

    setTheme(nextTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
