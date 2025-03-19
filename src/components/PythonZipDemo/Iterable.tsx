import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { IterableObject } from "./types";
import IterableItem from "./IterableItem";
import ItemButton from "./ItemButton";

interface Props {
  iterable: IterableObject;
  iterableIndex: number;
  updateItem?: (
    iterableIndex: number,
    itemIndex: number,
    value: string
  ) => void;
  addItem?: (iterableIndex: number) => void;
  removeItem?: (iterableIndex: number) => void;
  allowMutation?: boolean;
}

function animations(animateEntry: boolean) {
  return {
    animate: { scaleY: 1, opacity: 1, transformOrigin: "50% 0%" },
    initial: animateEntry
      ? { scaleY: 0, opacity: 0, transformOrigin: "50% 0%" }
      : undefined,
    // exit: { scaleY: 0, opacity: 1, transformOrigin: "50% 0%" },
  };
}

const preExitStyles = {
  height: 0,
  marginTop: "calc(var(--gap) * -1)",
};

function Iterable({
  iterable,
  iterableIndex,
  updateItem,
  addItem,
  removeItem,
  allowMutation = true,
}: Props) {
  return (
    <Wrapper
      data-key={iterable.id}
      {...animations(iterable.animateEntry)}
      style={iterable.exiting ? preExitStyles : undefined}
    >
      <AnimatePresence>
        {iterable.items.map((iterableItem, itemIndex) => {
          return (
            <IterableItem
              key={iterableItem.id}
              iterableItem={iterableItem}
              onChange={(e) => {
                if (allowMutation) {
                  updateItem &&
                    updateItem(iterableIndex, itemIndex, e.target.value);
                }
              }}
            />
          );
        })}
        {allowMutation && (
          <>
            <ItemButton onClick={() => addItem && addItem(iterableIndex)}>
              +
            </ItemButton>
            <ItemButton onClick={() => removeItem && removeItem(iterableIndex)}>
              -
            </ItemButton>
          </>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: var(--gap);
`;

export default Iterable;
