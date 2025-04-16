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
    _iterableIndex: number,
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
  };
}

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

  const isEmpty = iterable.items.length === 0;
  return (
    <Wrapper {...animations(iterable.animateEntry)}>
      <AnimatePresence>
        <ItemsWrapper
          animate={{
            outlineWidth: highlight ? "4px" : "0px",
          }}
          key={id + "-items-wrapper"}
        >
          {isEmpty && (
            <EmptyIndicator initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Empty
            </EmptyIndicator>
          )}
          {iterable.items.map((iterableItem, itemIndex) => {
            return (
              <IterableItem
                key={iterableItem.id}
                iterableItem={iterableItem}
                allowMutation={allowMutation}
                onChange={(value) => {
                  if (allowMutation) {
                    onEdit && onEdit();
                    updateItem && updateItem(iterableIndex, itemIndex, value);
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

const EmptyIndicator = styled(motion.div)`
  height: 48px;
  border: 2px dashed var(--color-gray-500);
  display: grid;
  place-items: center;
  padding-left: 8px;
  padding-right: 8px;
`;

export default Iterable;
