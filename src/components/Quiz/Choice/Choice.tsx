"use client";

import * as React from "react";
import styled from "styled-components";

function Choice({ children }: Props) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  & > p {
    margin: 0;
  }
`;

interface Props {
  children: React.ReactNode;
}
export default Choice;
