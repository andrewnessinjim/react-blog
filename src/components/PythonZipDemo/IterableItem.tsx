import { motion, useReducedMotion } from "framer-motion";
import styled, { css } from "styled-components";
import { IterableItemObject } from "./types";
import React from "react";

interface Props {
  iterableItem: IterableItemObject;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  // if (enableMotionAlternative) {
  //   return {
  //     initial: {
  //       opacity: animateEntry ? 0 : 1,
  //       boxShadow: "0 0 0 0px black",
  //     },
  //     animate: {
  //       opacity: 1,
  //       boxShadow: boop ? "0 0 0 4px green" : "0 0 0 0px black",
  //     },
  //     transition: {
  //       type: "spring",
  //       duration: 0.75,
  //     },
  //   };
  // }
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
  const { id, value, animateEntry, status } = iterableItem;

  const crossedOut = status === "ignored";
  const overlayDuplicate = status === "pending";
  const boop = status === "transitioning";

  const overlayLayoutId = id + "-out";
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <Wrapper>
      <UnderlayItem
        layoutId={id}
        {...animations(animateEntry, boop, prefersReducedMotion)}
      >
        {allowMutation ? (
          <CellInput type="number" max={99} value={value} onChange={onChange} />
        ) : (
          <CellSpan>{value}</CellSpan>
        )}
        {crossedOut && <Cross />}
      </UnderlayItem>
      {overlayDuplicate && (
        <OverlayItem
          layoutId={overlayLayoutId}
          {...animations(false, boop, prefersReducedMotion)}
        >
          <CellInput type="number" max={99} value={value} onChange={onChange} />
        </OverlayItem>
      )}
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  position: relative;
`;

const UnderlayItem = styled(motion.div)`
  width: 48px;
  aspect-ratio: 1;
  text-align: center;
  border: 2px dashed var(--color-primary-900);
  border-radius: 5px;
  background: transparent;

  position: relative;
`;

const OverlayItem = styled(UnderlayItem)`
  position: absolute;
  top: 0;
  left: 0;
`;

const cellStyles = css`
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  color: var(--color-primary-500);
  font-size: 1.25rem;
  text-align: center;
`;

const CellInput = styled(motion.input)`
  ${cellStyles};
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: textfield;
  appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const CellSpan = styled.span`
  ${cellStyles};
  display: grid;
  place-content: center;
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
