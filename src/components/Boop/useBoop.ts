import { MotionProps } from "framer-motion";
import React from "react";

export interface useBoopProps {
  rotation?: number;
  timing?: number;
  x?: number;
  y?: number;
  scale?: number;
}

function useBoop({
  rotation = 0,
  timing = 250,
  x = 0,
  y = 0,
  scale = 1,
}: useBoopProps): [() => void, MotionProps] {
  const [isBooped, setIsBooped] = React.useState(false);

  React.useEffect(() => {
    if (!isBooped) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsBooped(false);
    }, timing);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isBooped, timing]);

  const trigger = React.useCallback(() => {
    setIsBooped(true);
  }, []);

  const animationSettings: MotionProps = {
    animate: {
      rotate: isBooped ? rotation : 0,
      scale: isBooped ? scale : 1,
      x: isBooped ? x : 0,
      y: isBooped ? y : 0,
    },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
    },
  };

  return [trigger, animationSettings];
}

export default useBoop;
