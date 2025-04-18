"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /*
    CSS RESET
    https://www.joshwcomeau.com/css/custom-css-reset/
  */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  * {
    margin: 0;
  }
  html {
    scrollbar-gutter: stable;
  }
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }
  input,
  button,
  textarea,
  select {
    font: inherit;
  }
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  /* THEME VARIABLES */
  html {
    --content-width: 55rem;
    --outer-content-width: 80rem;
    --viewport-padding: 16px;
    --header-height: 5rem;
    --trimmed-content-width: calc(
      var(--content-width) - var(--viewport-padding) * 2
    );
  }

  @media (min-width: 35rem) {
    html {
      --viewport-padding: 24px;
    }
  }

  /* GLOBAL STYLES */
  ::selection {
    background-color: var(
      --color-selection-background
    ) !important;
    color: var(--color-selection-text) !important;
    background-image: none !important;
    -webkit-text-fill-color: var(
      --color-selection-text
    ) !important;
    -moz-text-fill-color: var(
      --color-selection-text
    ) !important;
    background-image: none !important;
    background-clip: revert !important;
    -webkit-background-clip: revert !important;
    text-shadow: none !important;
  }

  html {
    color: var(--color-text);
    font-family: var(--font-family), sans-serif;
    letter-spacing: -0.03125em;
    background: var(--color-backdrop-highlight);
  }

  #body-div {
    isolation: isolate;
    min-height: 100vh;
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    background: var(--color-backdrop);
    border-bottom: 3px solid var(--color-decorative-600);
  }

  #body-div::before {
    content: '';
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    height: 50vh;
    background: linear-gradient(
      to top,
      var(--color-backdrop),
      var(--color-backdrop-highlight)
    );
  }

  #body-div > main {
    flex: 1;
    position: relative;
  }

  em {
    font-style: italic;
  }
  code {
    font-family: var(--font-family-mono);
  }
  h1 {
    font-size: 1.75rem;
    font-weight: 650;
  }
  h2 {
    font-size: 1.5rem;
    margin-top: 2em;
    margin-bottom: 0.5em;
    font-weight: 600;
  }
  h3 {
    font-size: 1.25rem;
    margin-top: 2em;
    margin-bottom: 0.5em;
    font-weight: 500;
  }
  h4 {
    font-size: 1.25rem;
    margin-top: 1.25em;
    margin-bottom: 0.5em;
    font-weight: 500;
  }
  p {
    font-size: 1.25rem;
    margin-bottom: 1.5em;
  }
  p code {
    display: inline-block;
    font-size: 0.9em;
    background: var(--color-inline-code-bg);
    padding: 3px 6px;
    margin: -0.25em -1px;
    border-radius: 3px;
  }
  a {
    color: currentColor;
    text-decoration-color: var(--color-primary);
    text-decoration-thickness: 2px;
    text-underline-offset: 0.125em;
    font-weight: 500;
    transition: all 200ms;
  }
  a:hover {
    text-underline-offset: 0.175em;
  }
  button {
    padding: 0;
  }

  ul, ol {
    font-size: 1.25rem;
    margin-bottom: 1.5em;
    line-height: 1.5;
  }

  li {
    margin-bottom: 0.75rem;
  }

  @media (min-width: 35rem) {
    h1 {
      font-size: 2.25rem;
    }

    h2 {
      font-size: 1.75rem;
    }
    h3 {
      font-size: 1.5rem;
    }

    h4 {
      font-size: 1.25rem;
    }
  }

`;
export default GlobalStyles;
