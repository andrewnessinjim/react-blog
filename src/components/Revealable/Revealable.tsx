"use client";

import * as React from "react";
import styled from "styled-components";
import Button from "../Button";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  revealed?: boolean;
  triggerText?: string;
}

function Revealable({
  children,
  revealed = false,
  triggerText = "Reveal",
}: Props) {
  const [isRevealed, setIsRevealed] = React.useState(revealed);

  return (
    <Wrapper>
      {children}
      <AnimatePresence>
        {!isRevealed && (
          <Overlay exit={{ opacity: 0, transition: { duration: 0.5 } }}>
            <Button
              variant="secondary"
              size="large"
              onClick={() => setIsRevealed(true)}
            >
              {triggerText}
            </Button>
          </Overlay>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  border-radius: 4px;
`;

const Overlay = styled(motion.div)`
  border: 2px dashed var(--color-primary-900);
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: var(--color-backdrop);
`;

export default Revealable;
