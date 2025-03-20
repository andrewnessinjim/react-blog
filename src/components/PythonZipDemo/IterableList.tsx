import { motion } from "framer-motion";
import styled from "styled-components";
import Iterable from "./Iterable";
import { IterableObject } from "./types";
import { hi } from "date-fns/locale";

interface Props {
  addItem?: (paramIndex: number) => void;
  removeItem?: (iterableIndex: number) => void;
  updateItem?: (paramIndex: number, itemIndex: number, value: string) => void;
  iterables: IterableObject[];
  allowMutation?: boolean;
  highlightIndex?: number;
  onEdit?: () => void;
}

function IterableList({
  iterables,
  addItem,
  removeItem,
  updateItem,
  allowMutation = true,
  highlightIndex,
  onEdit,
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
            highlight={iterableIndex === highlightIndex}
            onEdit={onEdit}
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
