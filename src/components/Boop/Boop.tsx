"use client";

import { motion } from "framer-motion";
import * as React from "react";
import styled from "styled-components";

interface Props {
  timing: number;
  rotation: number;
  children: React.ReactNode;
  x: number;
  y: number;
  scale: number;
}

function Boop({
  rotation = 0,
  timing = 250,
  x = 0,
  y = 0,
  scale = 1,
  children,
}: Props) {
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

  const trigger = () => {
    console.log("Setting isBooped to true");
    setIsBooped(true);
  };

  return (
    <Wrapper
      onMouseEnter={trigger}
      animate={{
        rotate: isBooped ? rotation : 0,
        scale: isBooped ? scale : 1,
        x: isBooped ? x : 0,
        y: isBooped ? y : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 10,
      }}
    >
      {children}
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  display: inline-block;
  backface-visibility: hidden;
`;

export default Boop;
