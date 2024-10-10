import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';

import { Work_Sans, Spline_Sans_Mono } from "next/font/google";
import clsx from "clsx";

import { BLOG_TITLE } from "@/constants";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RespectMotionPreferences from "@/components/RespectMotionPreferences";
import ThemedHtml from "./ThemedHtml";
import StyledComponentsRegistry from "@/components/StyledComponentsRegistry";
import GlobalStyles from "@/components/GlobalStyles";
import SandPackCSS from "@/components/SandpackCSSRegistry";

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
  return (
    <RespectMotionPreferences>
      <StyledComponentsRegistry>
        <ThemedHtml
          lang="en"
          className={clsx(mainFont.variable, monoFont.variable)}
        >
          <head>
            <SandPackCSS />
          </head>
          <body>
            <Header />
            <main>{children}</main>
            <Footer />
            <GlobalStyles />
            <Analytics />
            <SpeedInsights />
          </body>
        </ThemedHtml>
      </StyledComponentsRegistry>
    </RespectMotionPreferences>
  );
}

export default RootLayout;
