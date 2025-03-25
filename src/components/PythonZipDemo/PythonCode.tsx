import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { range } from "lodash-es";
import React from "react";
import { IterableObject } from "./types";
import { motion } from "framer-motion";

interface Props {
  inputIterables: IterableObject[];
}

export function InputIterablesCode({ inputIterables }: Props) {
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

  return <PythonCode title="Code Representation" pythonCode={pythonCode} />;
}

export function OutputPrintedValueCode({
  outputIterables,
}: {
  outputIterables: IterableObject[];
}) {
  const pythonCode = ""
    .concat("[\n")
    .concat(
      outputIterables
        .map((iterable) => {
          return "    ("
            .concat(iterable.items.map((item) => item.value).join(", "))
            .concat(")");
        })
        .join(",\n")
    )
    .concat("\n")
    .concat("]\n");
  return (
    <PythonCode
      title="Printed Value"
      pythonCode={pythonCode}
      animateEntry={true}
    />
  );
}
function PythonCode({
  title,
  pythonCode,
  animateEntry = false,
}: {
  title: string;
  pythonCode: string;
  animateEntry?: boolean;
}) {
  return (
    <Wrapper
      initial={{ opacity: animateEntry ? 0 : 1 }}
      animate={{ opacity: 1 }}
    >
      <Title>{title}</Title>
      <StyledSyntaxHighlighter language="python" style={a11yDark}>
        {pythonCode}
      </StyledSyntaxHighlighter>
    </Wrapper>
  );
}

const Wrapper = styled(motion.section)`
  display: flex;
  flex-direction: column;
  gap: var(--gap);
`;

const Title = styled.h2`
  font-size: 1.25rem;
  margin: 0;
`;

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  padding: 1rem !important;
  border-radius: 8px;
  position: relative;
`;
