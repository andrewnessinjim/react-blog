"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  max-width: var(--outer-content-width);
  margin: 0 auto;
`;

export const Content = styled.div`
  position: relative;
  width: 100%;
  max-width: var(--content-width);
  padding: var(--viewport-padding);
  padding-top: calc(48px + 8vw);
  padding-bottom: 64px;
`;

export const Heading = motion(styled.h1`
  margin-bottom: 0.5rem;
`);

export const PublishedContainer = styled.p`
  font-size: 1.125rem;
  color: var(--color-decorative-900);
  margin-bottom: 0px;
  font-weight: 400;
  @media (min-width: 35rem) {
    font-size: 1.25rem;
  }
`;

export const PublishedTime = styled.time`
  font-weight: 500;
`;
