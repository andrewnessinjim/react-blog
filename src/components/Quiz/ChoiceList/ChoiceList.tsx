"use client";

import * as React from "react";
import styled from "styled-components";

function ChoiceList({ children }: Props) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

interface Props {
  children: React.ReactNode;
}

export default ChoiceList;
