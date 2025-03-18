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
import { ZipIterableProps } from "./types";

interface Props {
  inputIterables: ZipIterableProps[];
  onRunCode: () => void;
}

function PythonCode({ inputIterables, onRunCode }: Props) {
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
    <Wrapper>
      <StyledSyntaxHighlighter
        language="python"
        style={isDarkMode ? a11yDark : a11yLight}
      >
        {pythonCode}
      </StyledSyntaxHighlighter>
      <Button variant="primary" size="regular" onClick={onRunCode}>
        Run Code
      </Button>
    </Wrapper>
  );
}

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  padding: 1rem !important;
  border-radius: 8px;
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: var(--gap);
`;

export default PythonCode;
