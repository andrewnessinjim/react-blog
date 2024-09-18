"use client";

import { ComponentProps, ReactNode } from "react";
import styled from "styled-components";
import DemoUnitCard from "../DemoUnitCard";
import { MONITOR_HEIGHT, MONITOR_WIDTH } from "./constants";

export function IndependentViewport({ caption }: IndependentViewportProps) {
  const svgPadding = 6;
  return (
    <WidthRestrict>
      <DemoUnitCard caption={caption}>
        <Svg
          width={MONITOR_WIDTH + svgPadding}
          height={MONITOR_HEIGHT + svgPadding}
          viewBox={`0 0 ${MONITOR_WIDTH + svgPadding} ${
            MONITOR_HEIGHT + svgPadding
          }`}
        >
          <ViewportRect
            width={MONITOR_WIDTH}
            height={MONITOR_HEIGHT}
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
export function ViewportRect(delegated: ComponentProps<"rect">) {
  return <ViewportRectWrapper {...delegated} />;
}

const ViewportRectWrapper = styled.rect`
  stroke: var(--color-primary-500);
  fill: none;
  stroke-width: 2;
`;
