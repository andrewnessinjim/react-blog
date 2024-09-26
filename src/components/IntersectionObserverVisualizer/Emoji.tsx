import { AnimatePresence, motion, MotionProps } from "framer-motion";
import React from "react";
import styled from "styled-components";

const animationSettings: MotionProps = {
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

function AnimatingEmoji({ show, children }: Props) {
  return (
    <AnimatePresence>
      {show && <Emoji {...animationSettings}>{children}</Emoji>}
    </AnimatePresence>
  );
}

function AutoExitAnimatingEmoji({ children, onExit }: Props) {
  const [showEmoji, setShowEmoji] = React.useState(true);
  return (
    <AnimatePresence onExitComplete={onExit}>
      {showEmoji && (
        <Emoji
          {...animationSettings}
          onAnimationComplete={() => setShowEmoji(false)}
        >
          {children}
        </Emoji>
      )}
    </AnimatePresence>
  );
}

export function ObserverEmoji(delegated: Props) {
  return <AnimatingEmoji {...delegated}>🤨</AnimatingEmoji>;
}

export function HeartEmoji(delegated: Props) {
  return <AutoExitAnimatingEmoji {...delegated}>😍</AutoExitAnimatingEmoji>;
}

const Emoji = styled(motion.p)`
  font-size: 42px;
`;

interface Props {
  show?: boolean;
  children?: string;
  onExit?: () => void;
  autoExit?: boolean;
}
