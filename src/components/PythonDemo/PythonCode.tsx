import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import React from "react";
import { motion } from "framer-motion";

export function PythonCode({
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
      initial={{
        opacity: animateEntry ? 0 : 1,
        translateY: animateEntry ? -16 : 0,
      }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5 }}
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
