"use client";

import styled from "styled-components";
import DemoUnitCard from "../DemoUnitCard";
import { PAGE_HEIGHT, PAGE_WIDTH } from "./helpers";
import React, { ComponentProps, ReactNode } from "react";

//Constants used in this component is to accommodate the
//thickness of the lines.
function IndependentPage({ caption }: IndependentPageProps) {
  const svgPadding = 6;
  return (
    <WidthRestrict>
      <DemoUnitCard caption={caption}>
        <Svg
          height={PAGE_HEIGHT + svgPadding}
          width={PAGE_WIDTH + svgPadding}
          viewBox={`0 0 ${PAGE_WIDTH + svgPadding} ${PAGE_HEIGHT + svgPadding}`}
        >
          <PageRect
            height={PAGE_HEIGHT}
            width={PAGE_WIDTH}
            x={svgPadding / 2}
            y={svgPadding / 2}
          />
          <ObservedElement x={114 - 6} y={PAGE_HEIGHT - 28} />
        </Svg>
      </DemoUnitCard>
    </WidthRestrict>
  );
}

const WidthRestrict = styled.div`
  width: min(450px, 100%);
  margin-left: auto;
  margin-right: auto;
`;

const Svg = styled.svg`
  margin-left: auto;
  margin-right: auto;
`;

interface IndependentPageProps {
  caption: ReactNode;
}

export const ObservedElement = React.forwardRef<
  SVGImageElement,
  ComponentProps<"image">
>((delegated: ComponentProps<"image">, ref) => (
  <ObservedElementWrapper {...delegated} ref={ref}>
    🎁
  </ObservedElementWrapper>
));

const ObservedElementWrapper = styled.image`
  font-size: 44px;
`;

export function PageRect(delegated: ComponentProps<"rect">) {
  return <PageRectWrapper {...delegated} />;
}

const PageRectWrapper = styled.rect`
  stroke: var(--color-primary-700);
  fill: none;
  stroke-width: 2;
  stroke-dasharray: 4 4;
`;

export default IndependentPage;
