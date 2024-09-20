import { AnimatePresence, motion, MotionProps } from "framer-motion";
import React from "react";
import styled from "styled-components";

const emojiAnimationSettings: MotionProps = {
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

function AnimatingEmoji({
  show,
  showReaction,
  onAnimationStart,
  onAnimationComplete,
}: Props) {
  return (
    <AnimatePresence>
      {show && (
        <ReactionWrapper>
          {showReaction ? (
            <ReactingEmoji
              {...emojiAnimationSettings}
              onAnimationComplete={onAnimationComplete}
              onAnimationStart={onAnimationStart}
            >
              😍
            </ReactingEmoji>
          ) : (
            <ObservingEmoji {...emojiAnimationSettings}>🤨</ObservingEmoji>
          )}
        </ReactionWrapper>
      )}
    </AnimatePresence>
  );
}

const ReactionWrapper = styled(motion.div)`
  font-size: 3rem;
  position: absolute;
  left: 8px;
  top: 210px;
`;

const ObservingEmoji = styled(motion.p)`
  font-size: inherit;
`;

const ReactingEmoji = styled(motion.p)`
  font-size: inherit;
`;

interface Props {
  show: boolean;
  showReaction: boolean;
  onAnimationComplete: () => void;
  onAnimationStart: () => void;
}

export default AnimatingEmoji;
