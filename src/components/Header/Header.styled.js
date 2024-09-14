"use client";

import styled from "styled-components";

export const Wrapper = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-height);
  width: 100%;
  max-width: var(--content-width);
  padding: 0 var(--viewport-padding);
  margin-left: auto;
  margin-right: auto;
`;

export const Actions = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const Action = styled.button`
  display: block;
  border: none;
  background: transparent;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1000px;
  color: var(--color-text);
  cursor: pointer;
  transition: background 200ms;

  &:hover {
    background: var(--color-decorative-100);
  }

  & svg {
    display: block;
  }
`;
