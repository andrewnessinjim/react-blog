"use client";

import { MEDIA_QUERIES } from "@/constants";
import * as React from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}
function DesktopOnly({ children, as }: Props) {
  return <Wrapper as={as}>{children}</Wrapper>;
}

const Wrapper = styled.p`
  @media ${MEDIA_QUERIES.tabletAndBelow} {
    display: none;
  }
`;

export default DesktopOnly;
