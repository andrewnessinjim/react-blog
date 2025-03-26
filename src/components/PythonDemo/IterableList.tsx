import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import Iterable from "./Iterable";
import { IterableObject } from "./types";
import Button from "../Button";
import React from "react";

interface Props {
  addItem?: (paramIndex: number) => void;
  removeItem?: (iterableIndex: number) => void;
  updateItem?: (paramIndex: number, itemIndex: number, value: string) => void;
  iterables: IterableObject[];
  allowMutation?: boolean;
  highlightIndex?: number;
  title: string;
  onEdit?: () => void;
  addInputIterable?: () => void;
  removeInputIterable?: () => void;
}

function IterableList({
  iterables,
  addItem,
  removeItem,
  updateItem,
  allowMutation = true,
  highlightIndex,
  onEdit,
  addInputIterable,
  removeInputIterable,
  title,
}: Props) {
  return (

      <Wrapper>
        <Title>{title}</Title>
        {iterables.map((iterable, iterableIndex) => {
          return (
            <Iterable
              key={iterable.id}
              iterable={iterable}
              iterableIndex={iterableIndex}
              addItem={addItem}
              removeItem={removeItem}
              updateItem={updateItem}
              allowMutation={allowMutation}
              highlight={iterableIndex === highlightIndex}
              onEdit={onEdit}
            />
          );
        })}
        <AnimatePresence>
          {allowMutation && (
            <IterableControls
              layout={true}
              exit={{ opacity: 0 }}
              key={"controls"}
            >
              <Button
                variant="secondary"
                size="regular"
                onClick={() => {
                  addInputIterable && addInputIterable();
                }}
              >
                Add
              </Button>
              <Button
                variant="secondary"
                size="regular"
                onClick={() => {
                  removeInputIterable && removeInputIterable();
                }}
              >
                Remove
              </Button>
            </IterableControls>
          )}
        </AnimatePresence>
      </Wrapper>

  );
}

const Wrapper = styled(motion.section)`
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  position: relative;
`;

const Title = styled.h2`
  font-size: 1rem;
  margin: 0;
  font-weight: 600;
`;

const IterableControls = styled(motion.div)`
  display: flex;
  gap: var(--gap);
  align-self: center;
  position: relative;
`;

export default IterableList;
