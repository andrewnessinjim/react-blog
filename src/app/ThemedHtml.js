"use client";

import { ThemeContext } from "@/components/ThemeProvider";
import { DARK_TOKENS, LIGHT_TOKENS } from "@/constants";
import React from "react";

function ThemedHtml(props) {
  const { theme, isDarkMode } = React.useContext(ThemeContext);

  let dataColorThemeProp = {}; //Don't set if theme is undefined; the dangerouslySetInnerHTML in layout.js has already set the property in this case
  if (theme !== undefined) {
    dataColorThemeProp = { "data-color-theme": isDarkMode ? "dark" : "light" };
  }
  return (
    <html
      {...props}
      style={isDarkMode ? DARK_TOKENS : LIGHT_TOKENS}
      {...dataColorThemeProp}
    />
  );
}

export default ThemedHtml;
