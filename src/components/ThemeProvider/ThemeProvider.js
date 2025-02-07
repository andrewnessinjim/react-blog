"use client";

import React from "react";

export const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [theme, rawSetTheme] = React.useState(undefined);

  React.useEffect(() => {
    rawSetTheme(window.getInitialColorTheme);
  }, []);

  const isDarkMode = theme === "dark";

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";

    window.localStorage.setItem("color-theme", nextTheme);
    rawSetTheme(nextTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
