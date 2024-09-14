"use client";

import styled from "styled-components";

export const Wrapper = styled.div`
  --stroke-color: var(--color-decorative-600);
  --stroke-width: 3px;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
      75deg,
      var(--stroke-color) 0px var(--stroke-width),
      transparent var(--stroke-width) 10px
    ),
    var(--color-backdrop);
  /*
      Allow the .blocker to spill out, without introducing a
      scrollburglar.
    */
  overflow: hidden;

  html[data-color-theme="dark"] & {
    --stroke-color: var(--color-decorative-300);
  }
`;

export const SVGBlocker = styled.svg`
  position: absolute;
  inset: calc(var(--stroke-width) * -1);
  width: calc(100% + 4px);
  /*
      The swoops look too drastic below 800px.
      Better to crop it than to stretch it.
    */
  min-width: 800px;
  height: 80%;
  max-width: revert;

  & path {
    fill: var(--color-backdrop);
    stroke: var(--stroke-color);
    stroke-width: var(--stroke-width);
  }
`;
