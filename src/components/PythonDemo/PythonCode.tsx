import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import React from "react";
import { motion } from "framer-motion";
import StyledCollapsible from "../StyledCollapsible";

export function PythonCode({
  title,
  pythonCode,
  animateEntry = false,
  collapsed = false,
}: {
  title: string;
  pythonCode: string;
  animateEntry?: boolean;
  collapsed?: boolean;
}) {
  return (
    <Wrapper
      layout="position"
      initial={{
        opacity: animateEntry ? 0 : 1,
        translateY: animateEntry ? -16 : 0,
      }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5, layout: { duration: 0.15 } }}
    >
      <StyledCollapsible title={<Title>{title}</Title>} collapsed={collapsed}>
        <StyledSyntaxHighlighter language="python" style={a11yDark}>
          {pythonCode}
        </StyledSyntaxHighlighter>
      </StyledCollapsible>
    </Wrapper>
  );
}

const Wrapper = styled(motion.section)`
  display: flex;
  flex-direction: column;
  gap: var(--gap);
`;

const Title = styled.h2`
  font-size: 1.05rem;
  margin: 0;
`;

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  padding: 1rem !important;
  border-radius: 8px;
  position: relative;
`;
