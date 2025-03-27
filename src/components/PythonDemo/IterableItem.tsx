import { motion, useReducedMotion } from "framer-motion";
import styled from "styled-components";
import { IterableItemObject } from "./types";
import React from "react";
import Cell from "./Cell";

interface Props {
  iterableItem: IterableItemObject;
  onChange: (value: string) => void;
  allowMutation?: boolean;
}

const boopTransition = {
  type: "tween",
  duration: 0.5,
};

const regularTransition = {
  type: "spring",
  bounce: 0,
};

function animations(
  animateEntry: boolean,
  boop: boolean,
  enableMotionAlternative: boolean
) {
  return {
    initial: {
      scaleX: animateEntry ? 0 : 1,
      opacity: animateEntry ? 0 : 1,
      transformOrigin: "0% 50%",
    },
    animate: {
      scaleX: 1,
      opacity: 1,
      transformOrigin: "0% 50%",
      scale: boop ? [0.95, 1.05, 1] : 1,
      boxShadow:
        boop && enableMotionAlternative ? "0 0 0 4px green" : "0 0 0 0px black",
    },
    transition: boop ? boopTransition : regularTransition,
  };
}

function CrossLine({ rotate }: { rotate: number }) {
  return (
    <CrossLineWrapper
      initial={{ rotate, scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", bounce: 0.5 }}
    />
  );
}

function Cross() {
  return (
    <>
      <CrossLine rotate={45} />
      <CrossLine rotate={-45} />
    </>
  );
}

function IterableItem({ iterableItem, onChange, allowMutation = true }: Props) {
  const { id, animateEntry, status, fillValue } = iterableItem;
  let { value } = iterableItem;

  const underlayLayoutId =
    status === "input_transitioned"
      ? id
      : status === "output_transitioned" ||
        status === "transitioned_fill_pending"
      ? id + "-out"
      : id;

  const crossedOut = status === "ignored";

  const overlayOutput = status === "pending" || status === "pending_empty";
  const overlayOutputLayoutId = id + "-out";

  const overlayFill = status === "transitioned_filled";
  const overlayFillLayoutId = id + "-fill";

  const boop = status === "transitioning" || status === "transitioning_empty";

  const prefersReducedMotion = useReducedMotion() ?? false;

  const underlayValue =
    status === "pending_empty" ||
    status === "transitioned_empty" ||
    status === "transitioning_empty"
      ? "🚫"
      : value;

  return (
    <Wrapper>
      <UnderlayItem
        layoutId={underlayLayoutId}
        {...animations(animateEntry, boop, prefersReducedMotion)}
      >
        <Cell
          value={underlayValue}
          onChange={onChange}
          editable={allowMutation}
        />
        {crossedOut && <Cross />}
      </UnderlayItem>
      {overlayOutput && (
        <OverlayItem
          layoutId={overlayOutputLayoutId}
          {...animations(false, boop, prefersReducedMotion)}
        >
          <Cell value={value} editable={allowMutation} />
        </OverlayItem>
      )}
      {overlayFill && (
        <OverlayItem
          layoutId={overlayFillLayoutId}
          {...animations(false, boop, prefersReducedMotion)}
        >
          <Cell value={fillValue} editable={allowMutation} />
        </OverlayItem>
      )}
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  position: relative;
`;

const UnderlayItem = styled(motion.div)`
  position: relative;
`;

const OverlayItem = styled(UnderlayItem)`
  position: absolute;
  top: 0;
  left: 0;
`;

const CrossLineWrapper = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 6px;
  background: red;
  opacity: 0.5;
  margin-top: -3px;
  /* rotate: 45deg; */
`;

export default IterableItem;
