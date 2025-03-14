import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { ZipIterableProps } from "./types";
import IterableItem from "./IterableItem";
import ItemButton from "./ItemButton";

interface Props {
  iterable: ZipIterableProps;
  iterableIndex: number;
  updateItem: (iterableIndex: number, itemIndex: number, value: string) => void;
  addItem: (iterableIndex: number) => void;
  removeItem: (iterableIndex: number) => void;
}

function animations(animateEntry: boolean) {
  return {
    animate: { scaleY: 1, opacity: 1, transformOrigin: "50% 0%" },
    initial: animateEntry
      ? { scaleY: 0, opacity: 0, transformOrigin: "50% 0%" }
      : undefined,
    exit: { scaleY: 0, opacity: 1, transformOrigin: "50% 0%" },
  };
}

function ZipIterable({
  iterable,
  iterableIndex,
  updateItem,
  addItem,
  removeItem,
}: Props) {
  return (
    <Wrapper key={iterable.id} {...animations(iterable.animateEntry)}>
      <AnimatePresence>
        {iterable.items.map((iterableItem, itemIndex) => {
          return (
            <IterableItem
              key={iterableItem.id}
              iterableItem={iterableItem}
              onChange={(e) => {
                updateItem(iterableIndex, itemIndex, e.target.value);
              }}
            />
          );
        })}
      </AnimatePresence>
      <ItemButton onClick={() => addItem(iterableIndex)}>+</ItemButton>
      <ItemButton onClick={() => removeItem(iterableIndex)}>-</ItemButton>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: var(--gap);
`;

export default ZipIterable;
