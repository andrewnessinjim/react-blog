"use client";

import React, { ComponentProps } from "react";
import {
  OBSERVED_ELEM_HEIGHT,
  OBSERVED_ELEM_WIDTH,
  OBSERVED_ELEMENT_X,
  PAGE_TRANSITION,
} from "./constants";

import { motion } from "framer-motion";

function ObservedElement({ x, y, threshold, animateThresholdLine }: Props) {
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <motion.image
        animate={{
          x,
          y,
        }}
        transition={PAGE_TRANSITION}
        href="/images/balloon.png"
        width={OBSERVED_ELEM_WIDTH}
        height={OBSERVED_ELEM_HEIGHT}
      />
      {threshold !== undefined && isMounted && (
        <ThresholdMarker x={x} y={y} threshold={threshold} />
      )}
    </>
  );
}

function ThresholdMarker({ y, threshold }: MarkerProps) {
  const markerLineX1 = OBSERVED_ELEMENT_X;
  const markerLineX2 = OBSERVED_ELEMENT_X + OBSERVED_ELEM_WIDTH;
  const markerLineY = y + threshold * OBSERVED_ELEM_HEIGHT;

  const MARKER_TEXT_OFFSET_X = 6;

  return (
    <>
      <motion.rect
        animate={{
          x: OBSERVED_ELEMENT_X,
          y: y,
        }}
        transition={PAGE_TRANSITION}
        stroke="var(--color-primary-500)"
        strokeDasharray={"6 6"}
        fillOpacity={0}
        width={OBSERVED_ELEM_WIDTH}
        height={OBSERVED_ELEM_HEIGHT}
      />
      <motion.line
        animate={{
          x1: markerLineX1,
          y1: markerLineY,
          x2: markerLineX2,
          y2: markerLineY,
        }}
        transition={PAGE_TRANSITION}
        stroke="var(--color-primary-500)"
        strokeWidth={2}
      />
      <motion.text
        initial={false}
        animate={{
          x: markerLineX2 + MARKER_TEXT_OFFSET_X,
          y: markerLineY,
        }}
        transition={PAGE_TRANSITION}
        dominantBaseline={"middle"}
        fill="var(--color-primary-500)"
      >
        {threshold}
      </motion.text>
    </>
  );
}
type Props = ComponentProps<"image"> & {
  x: number;
  y: number;
  threshold?: number;
  animateThresholdLine?: boolean;
};

type MarkerProps = {
  x: number;
  y: number;
  threshold: number;
};

export default ObservedElement;
