"use client";

import * as Collapsible from "@radix-ui/react-collapsible";

import * as React from "react";
import { ChevronDown } from "react-feather";
import styled from "styled-components";
import useBoop from "../Boop/useBoop";
import { motion } from "framer-motion";

interface Props {
  collapsed?: boolean;
  children: React.ReactNode;
  title: React.ReactNode;
}

function StyledCollapsible({ title, collapsed = false, children }: Props) {
  const [open, setOpen] = React.useState(!collapsed);
  const [boopTrigger, boopAnimation] = useBoop({ y: 4 });
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    setOpen(!collapsed);
  }, [collapsed]);

  function animations() {
    if (hydrated) {
      return {
        initial: {
          scaleY: 0,
          opacity: 0,
          transformOrigin: "50% 0%",
        },
        animate: {
          scaleY: 1,
          opacity: 1,
          transformOrigin: "50% 0%",
        },
        transition: { type: "spring", duration: 0.25, bounce: 0 },
      };
    }
  }

  return (
    <RootWrapper open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <TriggerWrapper onMouseEnter={boopTrigger}>
        {title}
        <ChevronWrapper {...boopAnimation}>
          <ChevronDownIcon
            strokeWidth={2}
            size={32}
            color="var(--color-primary-500)"
            initial={{ rotate: open ? 180 : 0 }}
            animate={{ rotate: open && hydrated ? 180 : 0 }}
          />
        </ChevronWrapper>
      </TriggerWrapper>
      <Collapsible.Content style={{ display: "block" }}>
        <ContentWrapper {...animations()}>{children}</ContentWrapper>
      </Collapsible.Content>
    </RootWrapper>
  );
}

const RootWrapper = styled(Collapsible.Root)`
  width: 100%;
`;

const TriggerWrapper = styled(Collapsible.Trigger)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  /* background-color: var(--color-decorative-300); */
  background-color: transparent;
  border-radius: 4px;
  color: inherit;
  /* border: 1px dotted var(--color-primary-500); */
  border: none;
`;

const ContentWrapper = styled(motion.div)``;
const ChevronWrapper = styled(motion.span)``;
const ChevronDownIcon = motion(ChevronDown);

export default StyledCollapsible;
