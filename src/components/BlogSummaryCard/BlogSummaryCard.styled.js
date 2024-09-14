'use client';

import Link from "next/link";
import styled from "styled-components";
import Card from "@/components/Card";

export const Wrapper = styled(Card)`
  width: 100%;
  max-width: 750px;
  margin-bottom: 32px;
`;

export const TitleLink = styled(Link)`
  display: block;
  font-size: 1.75rem;
  line-height: 1.3;
  text-decoration: none;
  transition: color 200ms;
  margin-bottom: 0.25rem;

  &:hover {
    color: var(--color-primary);
  }
`;

export const PublishedTime = styled.time`
  display: block;
  margin-bottom: 1rem;
  font-weight: 500;
  font-size: 1.125rem;
  color: var(--color-decorative-900);
`;

export const TextPreview = styled.p`
  font-size: 1.125rem;
  margin-bottom: 0;
`;

export const ContinueReadingLink = styled(Link)`
  font-weight: 600;
  &:hover {
    text-underline-offset: 0.125em;
  }
`;

export const Arrow = styled.span`
  display: inline-block;
  font-family: "Monaco", monospace;
  color: var(--color-primary);
  transition: transform 200ms;
  font-weight: 400;

  ${ContinueReadingLink}:hover & {
    transform: translateX(4px);
  }
`;
