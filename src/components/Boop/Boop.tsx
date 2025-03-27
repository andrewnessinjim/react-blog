"use client";

import { motion } from "framer-motion";
import * as React from "react";
import styled from "styled-components";
import useBoop from "./useBoop";

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
  const [trigger, animationSettings] = useBoop(rotation, timing, x, y, scale);

  return (
    <Wrapper onMouseEnter={trigger} {...animationSettings}>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  display: inline-block;
  backface-visibility: hidden;
`;

export default Boop;
