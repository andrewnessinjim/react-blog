import { motion } from "framer-motion";
import styled from "styled-components";
import { IterableItemObject } from "./types";
import React from "react";

interface Props {
  iterableItem: IterableItemObject;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function IterableItem({ iterableItem, onChange }: Props) {
  return (
    <Wrapper
      data-key={iterableItem.id}
      layoutId={iterableItem.id}
      initial={{
        scaleX: iterableItem.animateEntry ? 0 : 1,
        opacity: iterableItem.animateEntry ? 0 : 1,
        transformOrigin: "0% 50%",
      }}
      animate={{ scaleX: 1, opacity: 1, transformOrigin: "0% 50%" }}
      transition={{ type: "spring", bounce: 0.25 }}
      value={iterableItem.value}
      type="number"
      max={99}
      onChange={onChange}
    />
  );
}

const Wrapper = styled(motion.input)`
  width: 56px;
  aspect-ratio: 1;
  text-align: center;
  border: 2px dashed var(--color-primary-900);
  border-radius: 5px;
  background: transparent;
  color: var(--color-primary-500);
  font-size: 1.5rem;
  -webkit-appearance: none;
  -moz-appearance: textfield;
  appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default IterableItem;
