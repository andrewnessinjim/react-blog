"use client";

import * as React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
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
  hasEnteredOrExitedViewPort,
  yPositionsFromScrollPos,
} from "./helpers";
import { ObservedElement, PageRect } from "./Page";
import { ViewportRect } from "./BrowserViewport";
import { MEDIA_QUERIES } from "@/constants";
import YPositionScroller, { YPositions } from "./YPositionScroller";

const DEFAULT_SCROLL_POSITION = 0;
function IntersectionObserverVisualizer({ caption }: Props) {
  const [isObserving, setIsObserving] = React.useState(false);
  const [isAnimatingEmoji, setIsAnimatingEmoji] = React.useState(false);
  const [yPositions, setYPositions] = React.useState<YPositions>(() =>
    yPositionsFromScrollPos(DEFAULT_SCROLL_POSITION)
  );

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

  function shouldAnimateEmoji(
    prevObservedElemY: number,
    nextObservedElemY: number
  ) {
    return (
      isObserving &&
      hasEnteredOrExitedViewPort(prevObservedElemY, nextObservedElemY)
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
                  {isAnimatingEmoji ? (
                    <ReactingEmoji
                      {...emojiAnimationSettings}
                      onAnimationComplete={() => setIsAnimatingEmoji(false)}
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
                id="viewport"
              />
              <PageRect
                width={PAGE_WIDTH}
                height={PAGE_HEIGHT}
                x={PAGE_X}
                y={yPositions.pageY}
              />
              <ObservedElement
                x={OBSERVED_ELEMENT_X}
                y={yPositions.observedElemY}
                href="/images/balloon.png"
                width="60"
                height="60"
              />
            </Svg>
            <YPositionScroller
              defaultScrollPosition={DEFAULT_SCROLL_POSITION}
              disabled={isAnimatingEmoji}
              onYPositionChange={(nextYPositions) => {
                setYPositions((prevYPositions) => {
                  setIsAnimatingEmoji(
                    shouldAnimateEmoji(
                      prevYPositions.observedElemY,
                      nextYPositions.observedElemY
                    )
                  );
                  return nextYPositions;
                });
              }}
            />
          </InteractiveSection>
          <ControlsSection>
            <ControlButton
              onClick={() => {
                setIsAnimatingEmoji(true);
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
  --aside-display: revert;

  @media ${MEDIA_QUERIES.tabletAndBelow} {
    flex-direction: column-reverse;
    --aside-display: none;
  }
`;

const Aside = styled.div`
  flex: 1;
  display: var(--aside-display);
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
