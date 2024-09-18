"use client";

import React from "react";

import {
  Sandpack,
  SandpackFile,
  SandpackFiles,
} from "@codesandbox/sandpack-react";

import { Wrapper } from "./SandpackDemo.styled";
import { ThemeContext } from "../ThemeProvider";

function SandpackLiveEditor({ files }: Props) {
  const { isDarkMode } = React.useContext(ThemeContext);

  return (
    <Wrapper>
      <Sandpack
        theme={isDarkMode ? "dark" : "light"}
        template="react"
        options={{
          editorHeight: 540,
          wrapContent: true,
          showConsole: true,
        }}
        files={files}
      />
    </Wrapper>
  );
}

interface Props {
  files?: SandpackFiles;
}

export default SandpackLiveEditor;
