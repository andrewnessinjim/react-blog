"use client";

import * as React from "react";
import styled from "styled-components";

function NoMarginParagraph(delegated: Props) {
  return <Wrapper {...delegated}></Wrapper>;
}

const Wrapper = styled.p`
  margin: 0;
`;

type Props = React.ComponentProps<"p">;

export default NoMarginParagraph;
