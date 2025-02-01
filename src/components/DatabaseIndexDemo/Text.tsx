import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

interface Props {
  left: number;
  top: number;
  className: string;
  children: string;
}

function Text({ left, top, className, children }: Props) {
  return (
    <Wrapper
      className={className}
      initial={{
        opacity: 0,
        y: "-100%",
      }}
      style={
        {
          "--left": left + "px",
          "--top": top + "px",
        } as React.CSSProperties
      }
    >
      {children}
    </Wrapper>
  );
}

const Wrapper = styled(motion.p)`
  position: absolute;
  font-size: 16px;
  left: var(--left);
  top: var(--top);
`;

export default Text;
