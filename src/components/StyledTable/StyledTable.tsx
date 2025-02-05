"use client";

import * as React from "react";
import styled from "styled-components";

// @ts-ignore
function StyledTable({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.table`
  width: fit-content;
  margin-bottom: 32px;
  & th,
  & td {
    text-align: start;
    padding: 2px 16px;
  }
  & tr {
    border: 4px solid var(--color-gray-500);
  }
`;

export default StyledTable;
