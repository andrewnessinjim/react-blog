"use client";

import * as React from "react";
import styled from "styled-components";

function CitedQuote({ children, citation, author }: Props) {
  return (
    <Figure>
      <BlockQuote>{children}</BlockQuote>
      <figcaption>
        <Author>{author}</Author>, <cite>{citation}</cite>
      </figcaption>
    </Figure>
  );
}

interface Props {
  children: React.ReactNode;
  citation: React.ReactNode;
  author: string;
}

const Figure = styled.figure`
  border-left: 8px solid var(--color-decorative-500);
  padding-left: 16px;
`;

const BlockQuote = styled.blockquote`
  &::before {
    content: "“";
  }
  &::after {
    content: "”";
  }
`;

const Author = styled.span`
  &::before {
    content: "—";
  }
`;

export default CitedQuote;
