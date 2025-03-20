import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { IterableObject } from "./types";
import IterableItem from "./IterableItem";
import ItemButton from "./ItemButton";
import React from "react";

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
  highlight?: boolean;
  onEdit?: () => void;
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
  highlight = false,
  onEdit,
}: Props) {
  const id = React.useId();

  return (
    <Wrapper
      {...animations(iterable.animateEntry)}
      style={iterable.exiting ? preExitStyles : undefined}
    >
      <AnimatePresence>
        <ItemsWrapper
          animate={{
            outlineWidth: highlight ? "4px" : "0px",
          }}
          key={id + "-items-wrapper"}
        >
          {iterable.items.map((iterableItem, itemIndex) => {
            return (
              <IterableItem
                key={iterableItem.id}
                iterableItem={iterableItem}
                onChange={(e) => {
                  if (allowMutation) {
                    onEdit && onEdit();
                    updateItem &&
                      updateItem(iterableIndex, itemIndex, e.target.value);
                  }
                }}
              />
            );
          })}
        </ItemsWrapper>
        {allowMutation && (
          <>
            <ItemButton
              onClick={() => {
                onEdit && onEdit();
                addItem && addItem(iterableIndex);
              }}
            >
              +
            </ItemButton>
            <ItemButton
              onClick={() => {
                onEdit && onEdit();
                removeItem && removeItem(iterableIndex);
              }}
            >
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

const ItemsWrapper = styled(Wrapper)`
  outline-style: solid;
  outline-width: 0px;
  outline-offset: 2px;
  outline-color: green;
`;

export default Iterable;
