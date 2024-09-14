"use client";

import styled from "styled-components";

export const Wrapper = styled.div`
  @keyframes spin {
    from {
      transform: rotate(-360deg);
    }
  }

  display: block;
  width: min-content;
  height: min-content;
  /* @ts-ignore */
  animation: spin 1000ms linear infinite;
  color: inherit;
  opacity: 0.6;

  & svg {
    display: block;
    max-width: revert;
  }
`;
