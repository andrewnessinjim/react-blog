"use client";

import * as React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Scrollbar from "./Scrollbar";
import DemoUnitCard from "../DemoUnitCard";
import {
  MONITOR_HEIGHT,
  MONITOR_WIDTH,
  PAGE_HEIGHT,
  PAGE_WIDTH,
} from "./constants";
import { ObservedElement, PageRect } from "./Page";
import { ViewportRect } from "./BrowserViewport";

function IntersectionObserverVisualizer({ caption }: Props) {
  const [scrollPosition, setScrollPosition] = React.useState(100);
  const [isObserving, setIsObserving] = React.useState(false);
  const [isAnimatingCallback, setIsAnimatingCallback] = React.useState(false);

  const viewBoxWidth = 288;
  const viewBoxHeight = 600;

  const monitorX = 4;
  const monitorY = 210;

  const pageX = monitorX + 5;

  const MIN_PAGE_Y = 26;
  const MAX_PAGE_Y = 214;
  const observedElementVisibilityPoint = 30;

  const pageY = MIN_PAGE_Y + (scrollPosition / 100) * (MAX_PAGE_Y - MIN_PAGE_Y);

  const observedElementX = 114;
  const observedElementY = pageY + PAGE_HEIGHT - 28;

  // const isObservedElementInViewport = scrollPosition <= 30;

  const emojiAnimationSettings = {
    initial: {
      scale: 0,
    },
    animate: {
      scale: 1,
    },
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 300,
    },
    exit: {
      scale: 0,
      transition: {
        type: "tween",
      },
    },
  };

  function hasExitedView(prevScrollPos: number, nextScrollPos: number) {
    return (
      prevScrollPos <= observedElementVisibilityPoint &&
      nextScrollPos > observedElementVisibilityPoint
    );
  }

  function hasEnteredView(prevScrollPos: number, nextScrollPos: number) {
    return (
      prevScrollPos > observedElementVisibilityPoint &&
      nextScrollPos <= observedElementVisibilityPoint
    );
  }

  return (
    <WidthRestrict>
      <DemoUnitCard caption={caption}>
        <Wrapper>
          <Aside />
          <InteractiveSection>
            <AnimatePresence>
              {isObserving && (
                <ReactionWrapper>
                  {isAnimatingCallback ? (
                    <ReactingEmoji
                      {...emojiAnimationSettings}
                      onAnimationComplete={() => setIsAnimatingCallback(false)}
                    >
                      😍
                    </ReactingEmoji>
                  ) : (
                    <ObservingEmoji {...emojiAnimationSettings}>
                      🤨
                    </ObservingEmoji>
                  )}
                </ReactionWrapper>
              )}
            </AnimatePresence>
            <Svg
              width={viewBoxWidth}
              height={viewBoxHeight}
              viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            >
              <ViewportRect
                width={MONITOR_WIDTH}
                height={MONITOR_HEIGHT}
                x={monitorX}
                y={monitorY}
              />

              <PageRect
                width={PAGE_WIDTH}
                height={PAGE_HEIGHT}
                x={pageX}
                y={pageY}
              />
              <ObservedElement x={observedElementX} y={observedElementY}>
                🎁
              </ObservedElement>
            </Svg>
            <Scrollbar
              disabled={isAnimatingCallback}
              value={[scrollPosition]}
              onValueChange={([nextScrollPosition]) => {
                setScrollPosition((prevScrollPosition) => {
                  if (isObserving) {
                    if (
                      hasEnteredView(prevScrollPosition, nextScrollPosition) ||
                      hasExitedView(prevScrollPosition, nextScrollPosition)
                    ) {
                      setIsAnimatingCallback(true);
                    }
                  }
                  return nextScrollPosition;
                });
              }}
            />
          </InteractiveSection>
          <ControlsSection>
            <ControlButton
              onClick={() => {
                setIsAnimatingCallback(true);
                setIsObserving(true);
              }}
            >
              Start Observing
            </ControlButton>
            <ControlButton onClick={() => setIsObserving(false)}>
              Stop Observing
            </ControlButton>
          </ControlsSection>
        </Wrapper>
      </DemoUnitCard>
    </WidthRestrict>
  );
}
const WidthRestrict = styled.div`
  min-width: 350px;
`;

const Wrapper = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Aside = styled.div`
  flex: 1;
`;

const ControlsSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const ControlButton = styled.button`
  padding: 6px 12px;
  width: 150px;
`;

const ReactionWrapper = styled(motion.div)`
  font-size: 3rem;
  position: absolute;
  left: 8px;
  top: 210px;
`;

const InteractiveSection = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const ObservingEmoji = styled(motion.p)`
  font-size: inherit;
`;

const ReactingEmoji = styled(motion.p)`
  font-size: inherit;
`;

const Svg = styled.svg`
  /* border: 1px dashed fuchsia; */
`;

interface Props {
  caption: React.ReactNode;
}

export default IntersectionObserverVisualizer;
