import { motion } from "framer-motion";
import styled from "styled-components";
import Iterable from "./Iterable";
import { IterableObject } from "./types";

interface Props {
  addItem?: (paramIndex: number) => void;
  removeItem?: (iterableIndex: number) => void;
  updateItem?: (paramIndex: number, itemIndex: number, value: string) => void;
  iterables: IterableObject[];
  allowMutation?: boolean;
}

function IterableList({
  iterables,
  addItem,
  removeItem,
  updateItem,
  allowMutation = true,
}: Props) {
  return (
    <Wrapper>
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
          />
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  position: relative;
`;

export default IterableList;
