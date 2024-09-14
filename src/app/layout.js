import React from "react";
import { Work_Sans, Spline_Sans_Mono } from "next/font/google";
import clsx from "clsx";

import { BLOG_TITLE } from "@/constants";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./styles.css";
import RespectMotionPreferences from "@/components/RespectMotionPreferences";
import ThemedHtml from "./ThemedHtml";

export const metadata = {
  title: {
    template: `%s • ${BLOG_TITLE}`,
    default: BLOG_TITLE,
  },
  description: "A wonderful blog post about JavaScript",
};

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
});
const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono",
});

function RootLayout({ children }) {
  const theme = "dark";

  return (
    <RespectMotionPreferences>
        <ThemedHtml
          lang="en"
          className={clsx(mainFont.variable, monoFont.variable)}
          data-color-theme={theme}
        >
          <body>
            <Header theme={theme} />
            <main>{children}</main>
            <Footer />
          </body>
        </ThemedHtml>
    </RespectMotionPreferences>
  );
}

export default RootLayout;
