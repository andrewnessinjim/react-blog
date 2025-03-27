"use client";

import { motion } from "framer-motion";
import * as React from "react";
import styled from "styled-components";
import useBoop, { useBoopProps } from "./useBoop";

interface Props extends useBoopProps {
  children: React.ReactNode;
}

function Boop({ children, ...boopConfig }: Props) {
  const [trigger, animationSettings] = useBoop(boopConfig);

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
