"use client";

import styled from "styled-components";

export const Wrapper = styled.article`
  padding-bottom: 64px;
  position: relative;
  z-index: 2;
`;

export const Page = styled.div`
  position: relative;
  display: grid;
  grid-template-columns:
    1fr min(var(--trimmed-content-width), 100%)
    1fr;
  max-width: var(--outer-content-width);
  margin: 0 auto;
  padding: 64px var(--viewport-padding) 32px;
  background: var(--color-page-background);
  box-shadow: var(--shadow-page);

  & > * {
    grid-column: 2;
  }

  @media (min-width: 80rem) {
    border: 1px solid var(--color-page-border);
    border-radius: 8px;
  }
`;
