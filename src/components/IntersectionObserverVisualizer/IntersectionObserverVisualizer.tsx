"use client";

import * as React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import DemoUnitCard from "../DemoUnitCard";
import {
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
  PAGE_HEIGHT,
  PAGE_WIDTH,
  VIEW_BOX_WIDTH,
  VIEW_BOX_HEIGHT,
  VIEWPORT_X,
  VIEWPORT_Y,
  PAGE_X,
  OBSERVED_ELEMENT_X,
  PAGE_TRANSITION,
} from "./constants";
import { ViewportRect } from "./Viewport";
import { MEDIA_QUERIES } from "@/constants";
import YPositionScroller from "./YPositionScroller";
import AnimatingEmoji from "./AnimatingEmoji";
import useDidEnterOrExitViewport from "./useDidEnterOrExitViewport";
import ControlPanel from "./ControlPanel";

import { PageRect } from "./Page";
import ObservedElement from "./ObservedElement";

function IntersectionObserverVisualizer({ caption }: Props) {
  const {
    yPositions,
    updateYPositions,
    didEnterViewport,
    didExitViewport,
    threshold,
    setThreshold,
    rootMargin,
    setRootMargin,
  } = useDidEnterOrExitViewport();

  const [scrollerDisabled, setScrollerDisabled] = React.useState(false);
  const [showEmoji, setShowEmoji] = React.useState(false);
  const [showReaction, setShowReaction] = React.useState(false);

  React.useEffect(() => {
    if (didEnterViewport) {
      setShowReaction(true);
    }
  }, [didEnterViewport]);

  React.useEffect(() => {
    if (didExitViewport) {
      setShowReaction(true);
    }
  }, [didExitViewport]);

  return (
    <WidthRestrict>
      <DemoUnitCard caption={caption}>
        <Wrapper>
          <InteractiveSection>
            <AnimatingEmoji
              show={showEmoji}
              showReaction={showReaction}
              onAnimationStart={() => {
                setScrollerDisabled(true);
              }}
              onAnimationComplete={() => {
                setShowReaction(false);
                setScrollerDisabled(false);
              }}
            />
            <Svg
              id="svg"
              width={VIEW_BOX_WIDTH}
              height={VIEW_BOX_HEIGHT}
              viewBox={`0 0 ${VIEW_BOX_WIDTH} ${VIEW_BOX_HEIGHT}`}
            >
              <ViewportRect
                width={VIEWPORT_WIDTH}
                height={VIEWPORT_HEIGHT}
                x={VIEWPORT_X}
                y={VIEWPORT_Y}
              />
              <motion.rect
                transition={{
                  type: "spring",
                  damping: 30,
                  stiffness: 150,
                }}
                animate={{
                  width: VIEWPORT_WIDTH,
                  height: VIEWPORT_HEIGHT + rootMargin,
                  attrX: VIEWPORT_X,
                  attrY: VIEWPORT_Y,
                }}
                initial={{
                  width: VIEWPORT_WIDTH,
                  height: VIEWPORT_HEIGHT + rootMargin,
                  attrX: VIEWPORT_X,
                  attrY: VIEWPORT_Y,
                }}
                fill="var(--color-primary-500)"
                fillOpacity={0.25}
              />
              <PageRect
                width={PAGE_WIDTH}
                height={PAGE_HEIGHT}
                animate={{
                  attrX: PAGE_X,
                  attrY: yPositions.pageY,
                }}
                initial={{
                  attrX: PAGE_X,
                  attrY: yPositions.pageY,
                }}
                transition={PAGE_TRANSITION}
              />
              <ObservedElement
                x={OBSERVED_ELEMENT_X}
                y={yPositions.observedElemY}
                threshold={threshold}
              />
            </Svg>
            <YPositionScroller
              disabled={scrollerDisabled}
              onYPositionChange={updateYPositions}
            />
          </InteractiveSection>
          <ControlPanel
            onThresholdChange={setThreshold}
            threshold={threshold}
            rootMargin={rootMargin}
            onRootMarginChange={setRootMargin}
            onStartObserve={() => {
              setShowReaction(true);
              setShowEmoji(true);
            }}
            onEndObserve={() => setShowEmoji(false)}
          />
        </Wrapper>
      </DemoUnitCard>
    </WidthRestrict>
  );
}

const WidthRestrict = styled.div`
  min-width: 350px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  --aside-display: revert;

  @media ${MEDIA_QUERIES.tabletAndBelow} {
    flex-direction: column-reverse;
    --aside-display: none;
  }
`;

const InteractiveSection = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Svg = styled.svg`
  /* border: 1px dashed fuchsia; */
`;

interface Props {
  caption: React.ReactNode;
}

export default IntersectionObserverVisualizer;
