"use client";

import styled from "styled-components";
import DemoUnitCard from "../DemoUnitCard";
import {
  OBSERVED_ELEM_OFFSET_FROM_BOTTOM,
  OBSERVED_ELEMENT_X,
  PAGE_HEIGHT,
  PAGE_WIDTH,
} from "./constants";
import React, { ComponentProps, ReactNode } from "react";
import ObservedElement from "./ObservedElement";
import { motion, SVGMotionProps } from "framer-motion";

//Constants used in this component is to accommodate the
//thickness of the lines.
function IndependentPage({ caption }: IndependentPageProps) {
  const svgPadding = 6;
  return (
    <Wrapper caption={caption}>
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
        <ObservedElement
          x={OBSERVED_ELEMENT_X}
          y={PAGE_HEIGHT + OBSERVED_ELEM_OFFSET_FROM_BOTTOM}
          threshold={1}
        />
      </Svg>
    </Wrapper>
  );
}

const Wrapper = styled(DemoUnitCard)`
  width: min(450px, 100%);
`;

const Svg = styled.svg`
  margin-left: auto;
  margin-right: auto;
`;

interface IndependentPageProps {
  caption: ReactNode;
}

export function PageRect(delegated: SVGMotionProps<SVGRectElement>) {
  return <PageRectWrapper {...delegated} />;
}

const PageRectWrapper = styled(motion.rect)<SVGMotionProps<SVGRectElement>>`
  stroke: var(--color-primary-700);
  fill: none;
  stroke-width: 2;
  stroke-dasharray: 4 4;
`;

export default IndependentPage;
