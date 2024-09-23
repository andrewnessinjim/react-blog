"use client";

import * as React from "react";
import styled from "styled-components";

function Question({ children }: Props) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  border: 2px dashed var(--color-gray-300);
  padding: 16px;
  border-radius: 8px;
  & > p {
    margin: 0;
  }
`;

interface Props {
  children: React.ReactNode;
}

export default Question;
