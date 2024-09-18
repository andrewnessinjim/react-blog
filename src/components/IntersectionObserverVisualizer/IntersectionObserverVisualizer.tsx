"use client";

import * as React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
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

  const viewBoxWidth = 288;
  const viewBoxHeight = 600;

  const monitorX = 4;
  const monitorY = 210;

  const pageX = monitorX + 5;

  const MIN_PAGE_Y = 26;
  const MAX_PAGE_Y = 214;
  const pageY = MIN_PAGE_Y + (scrollPosition / 100) * (MAX_PAGE_Y - MIN_PAGE_Y);

  const observedElementX = 114;
  const observedElementY = pageY + PAGE_HEIGHT - 28;

  const isObservedElementInViewport = scrollPosition <= 30;

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
  };

  return (
    <WidthRestrict>
      <DemoUnitCard caption={caption}>
        <Wrapper>
          <ReactionWrapper>
            {isObservedElementInViewport ? (
              <ReactingEmoji
                {...emojiAnimationSettings}
                onAnimationComplete={() => console.log("Animation complete")}
              >
                😍
              </ReactingEmoji>
            ) : (
              <ObservingEmoji {...emojiAnimationSettings}>🤨</ObservingEmoji>
            )}
          </ReactionWrapper>
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
            value={[scrollPosition]}
            onValueChange={([nextScrollPosition]) =>
              setScrollPosition(nextScrollPosition)
            }
          />
        </Wrapper>
      </DemoUnitCard>
    </WidthRestrict>
  );
}
const WidthRestrict = styled.div`
  min-width: 350px;
`;
const Wrapper = styled.figure`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ReactionWrapper = styled(motion.div)`
  font-size: 3rem;
  position: absolute;
  top: 24px;
  left: 24px;
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
