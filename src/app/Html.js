"use client";

import { ThemeContext } from "@/components/ThemeProvider";
import { DARK_TOKENS, LIGHT_TOKENS } from "@/constants";
import React from "react";

function Html(props) {
  const { isDarkMode } = React.useContext(ThemeContext);

  return (
    <html
      {...props}
      style={isDarkMode ? DARK_TOKENS : LIGHT_TOKENS}
      data-color-theme={isDarkMode ? "dark": "light"}
    />
  );
}

export default Html;
