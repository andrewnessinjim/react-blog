"use client";

import * as React from "react";
import styled from "styled-components";
import * as Popover from "@radix-ui/react-popover";
import useHover from "@/hooks/useHover";
import { motion } from "framer-motion";

function InfoPopover({ children}: { children: string }) {
  const [isHovered, hoverRef] = useHover<HTMLButtonElement>();
  return (
    <Popover.Root open={isHovered}>
      <TriggerButton ref={hoverRef}>*</TriggerButton>
      <Popover.Portal>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <PopoverContent>
            <p>{children}</p>
            <PopoverArrow />
          </PopoverContent>
        </motion.div>
      </Popover.Portal>
    </Popover.Root>
  );
}

const TriggerButton = styled(Popover.Trigger)`
  all: unset;
  display: inline-block;
  color: var(--color-primary);
  font-weight: 700;
  margin-top: -32px;
`;

const PopoverContent = styled(Popover.Content)`
  /* background-color: var(--color-decorative-100); */
  background-color: var(--color-decorative-500);
  padding: 16px;
  width: 260px;
  border-radius: 8px;

  & > p {
    margin: 0;
  }
`;

const PopoverArrow = styled(Popover.Arrow)`
  fill: var(--color-decorative-500);
`;

export default InfoPopover;
