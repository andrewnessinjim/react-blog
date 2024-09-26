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
import { HeartEmoji, ObserverEmoji } from "./Emoji";
import useDidEnterOrExitViewport from "./useDidEnterOrExitViewport";
import ControlPanel from "./ControlPanel";

import { PageRect } from "./Page";
import ObservedElement from "./ObservedElement";
import _ from "lodash-es";

function IntersectionObserverVisualizer({
  caption,
  showConfigurator = false,
}: Props) {
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

  const [isObserving, setIsObserving] = React.useState(false);
  const [numHeartReactions, setNumHeartReactions] = React.useState(0);

  React.useEffect(() => {
    if (didEnterViewport && isObserving) {
      setNumHeartReactions((numHeartReactions) => numHeartReactions + 1);
    }
  }, [didEnterViewport]);

  React.useEffect(() => {
    if (didExitViewport && isObserving) {
      setNumHeartReactions((numHeartReactions) => numHeartReactions + 1);
    }
  }, [didExitViewport]);

  return (
    <WidthRestrict>
      <DemoUnitCard caption={caption}>
        <Wrapper>
          <InteractiveSection>
            <HeartEmojisWrapper>
              {_.range(numHeartReactions).map((index) => (
                <HeartEmoji
                  key={index}
                  onExit={() => {
                    setNumHeartReactions(
                      (numHeartReactions) => numHeartReactions - 1
                    );
                  }}
                />
              ))}
            </HeartEmojisWrapper>
            <ObserverEmojiWrapper>
              <ObserverEmoji show={isObserving} />
            </ObserverEmojiWrapper>
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
              {showConfigurator && (
                <RootMarginHighlighter rootMargin={rootMargin} />
              )}

              <WebPage y={yPositions.pageY}/>
              <ObservedElement
                x={OBSERVED_ELEMENT_X}
                y={yPositions.observedElemY}
                threshold={threshold}
                showConfigurator={showConfigurator}
              />
            </Svg>
            <YPositionScroller onYPositionChange={updateYPositions} />
          </InteractiveSection>
          <ControlPanel
            showConfigurator={showConfigurator}
            onThresholdChange={setThreshold}
            threshold={threshold}
            rootMargin={rootMargin}
            onRootMarginChange={setRootMargin}
            onStartObserve={() => {
              setNumHeartReactions(
                (numHeartReactions) => numHeartReactions + 1
              );
              setIsObserving(true);
            }}
            onEndObserve={() => setIsObserving(false)}
          />
        </Wrapper>
      </DemoUnitCard>
    </WidthRestrict>
  );
}

function RootMarginHighlighter({ rootMargin }: { rootMargin: number }) {
  const animationSettings = {
    width: VIEWPORT_WIDTH,
    height: VIEWPORT_HEIGHT + rootMargin,
    attrX: VIEWPORT_X,
    attrY: VIEWPORT_Y,
  };
  return (
    <motion.rect
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 150,
      }}
      animate={animationSettings}
      initial={animationSettings}
      fill="var(--color-primary-500)"
      fillOpacity={0.25}
    />
  );
}

function WebPage({ y }: { y: number }) {
  const animationSettings = {
    attrX: PAGE_X,
    attrY: y,
  };
  return (
    <PageRect
      width={PAGE_WIDTH}
      height={PAGE_HEIGHT}
      animate={animationSettings}
      initial={animationSettings}
      transition={PAGE_TRANSITION}
    />
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

  @media ${MEDIA_QUERIES.phoneAndBelow} {
    flex-direction: column-reverse;
    --aside-display: none;
  }
`;

const InteractiveSection = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const HeartEmojisWrapper = styled.div`
  position: absolute;
  display: flex;
  left: 10px;
  top: 140px;
`;

const ObserverEmojiWrapper = styled.div`
  position: absolute;
  left: 10px;
  top: 208px;
`;

const Svg = styled.svg`
  /* border: 1px dashed fuchsia; */
`;

interface Props {
  caption: React.ReactNode;
  showConfigurator: boolean;
}

export default IntersectionObserverVisualizer;
