import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  a11yDark,
  a11yLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import Button from "../Button";
import { range } from "lodash-es";
import { ThemeContext } from "../ThemeProvider";
import React from "react";
import { IterableObject } from "./types";

interface Props {
  inputIterables: IterableObject[];
}

function PythonCode({ inputIterables }: Props) {
  const { isDarkMode } = React.useContext(ThemeContext);
  const pythonCode = inputIterables
    .map((iterable, itertableIndex) => {
      return `iterable${itertableIndex} = [${iterable.items
        .map((item) => item.value)
        .join(", ")}]`;
    })
    .join("\n")
    .concat("\nzipped = zip(\n")
    .concat(
      range(inputIterables.length)
        .map((i) => `    iterable${i}`)
        .join(",\n")
    )
    .concat("\n)\n")
    .concat("print(list(zipped))\n");

  return (
    <StyledSyntaxHighlighter
      language="python"
      style={isDarkMode ? a11yDark : a11yLight}
    >
      {pythonCode}
    </StyledSyntaxHighlighter>
  );
}

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  padding: 1rem !important;
  border-radius: 8px;
  position: relative;
`;

export default PythonCode;
