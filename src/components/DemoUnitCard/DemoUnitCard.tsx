"use client";

import * as React from "react";
import styled from "styled-components";

function DemoUnitCard({ children, caption, ...delegated }: Props) {
  return (
    <Wrapper {...delegated}>
      <ContentWrapper>
        <DemoFigure>{children}</DemoFigure>
        {caption && <DemoCaption>{caption}</DemoCaption>}
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* width: 100%; */
  background-color: var(--color-gray-100);
  border-radius: 8px;
  box-shadow: var(--shadow-card);
  margin-left: auto;
  margin-right: auto;
  container-type: inline-size;
  margin-bottom: 1.5em;
`;

const ContentWrapper = styled.div`
  --spacing: clamp(16px, 5.8cqw, 56px);
  display: flex;
  flex-direction: column;
  gap: var(--spacing);
  padding: var(--spacing);
`;

const DemoCaption = styled.figcaption`
  font-style: italic;
  text-align: center;
`;

const DemoFigure = styled.figure``;

type Props = React.ComponentProps<"div"> & { caption?: React.ReactNode };

export default DemoUnitCard;
