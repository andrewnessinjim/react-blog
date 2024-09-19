import { AnimatePresence, motion, MotionProps } from "framer-motion";
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

function AnimatingEmoji({ emojiStatus, onAnimationEnd }: Props) {
  const showEmoji = emojiStatus !== "idle";
  const shouldReact = emojiStatus === 'react';
  return (
    <AnimatePresence>
      {showEmoji && (
        <ReactionWrapper>
          {shouldReact ? (
            <ReactingEmoji
              {...emojiAnimationSettings}
              onAnimationComplete={onAnimationEnd}
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
  emojiStatus: string;
  onAnimationEnd: () => void;
}

export default AnimatingEmoji;
