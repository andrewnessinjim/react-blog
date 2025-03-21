import { motion } from "framer-motion";
import styled from "styled-components";
import { IterableItemObject } from "./types";
import React from "react";

interface Props {
  iterableItem: IterableItemObject;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const boopTransition = {
  type: "tween",
  duration: 0.5,
};

const regularTransition = {
  type: "spring",
  bounce: 0.5,
};

function CrossLine({ rotate }: { rotate: number }) {
  return (
    <CrossLineWrapper
      initial={{ rotate, scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", bounce: 0.5 }}
    />
  );
}

function IterableItem({ iterableItem, onChange }: Props) {
  const { id, value, animateEntry, crossedOut, boop } = iterableItem;
  const [booping, setBooping] = React.useState(!!boop);

  React.useEffect(() => {
    if (boop) {
      setBooping(true);
      setTimeout(() => setBooping(false), 500);
    }
  }, [boop]);

  return (
    <Wrapper
      data-key={id}
      layoutId={id}
      initial={{
        scaleX: animateEntry ? 0 : 1,
        opacity: animateEntry ? 0 : 1,
        transformOrigin: "0% 50%",
      }}
      animate={{
        scaleX: 1,
        opacity: 1,
        transformOrigin: "0% 50%",
        scale: booping ? [0.95, 1.05, 1] : 1,
      }}
      transition={booping ? boopTransition : regularTransition}
    >
      <Input type="number" max={99} value={value} onChange={onChange} />
      {crossedOut && (
        <>
          <CrossLine rotate={45} />
          <CrossLine rotate={-45} />
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  width: 48px;
  aspect-ratio: 1;
  text-align: center;
  border: 2px dashed var(--color-primary-900);
  border-radius: 5px;
  background: transparent;

  position: relative;
  display: inline-block;
`;

const Input = styled(motion.input)`
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  color: var(--color-primary-500);
  font-size: 1.25rem;
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
