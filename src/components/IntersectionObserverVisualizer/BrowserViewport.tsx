"use client";

import React, { ComponentProps, ReactNode } from "react";
import styled from "styled-components";
import DemoUnitCard from "../DemoUnitCard";
import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from "./helpers";

export function IndependentViewport({ caption }: IndependentViewportProps) {
  const svgPadding = 6;
  return (
    <WidthRestrict>
      <DemoUnitCard caption={caption}>
        <Svg
          width={VIEWPORT_WIDTH + svgPadding}
          height={VIEWPORT_HEIGHT + svgPadding}
          viewBox={`0 0 ${VIEWPORT_WIDTH + svgPadding} ${
            VIEWPORT_HEIGHT + svgPadding
          }`}
        >
          <ViewportRect
            width={VIEWPORT_WIDTH}
            height={VIEWPORT_HEIGHT}
            x={svgPadding / 2}
            y={svgPadding / 2}
          />
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

interface IndependentViewportProps {
  caption: ReactNode;
}
export const ViewportRect = React.forwardRef<
  SVGRectElement,
  ComponentProps<"rect">
>((delegated, ref) => {
  return <ViewportRectWrapper {...delegated} ref={ref} />;
});

const ViewportRectWrapper = styled.rect`
  stroke: var(--color-primary-500);
  fill: none;
  stroke-width: 2;
`;
