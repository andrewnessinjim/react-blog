import { motion } from "framer-motion";
import styled from "styled-components";
import IterableList from "./IterableList";
import { IterableObject } from "./types";
import { range } from "lodash-es";

interface Props {
  inputIterables: IterableObject[];
  animationStep: number;
}

const itemsMoveBegin = 3;

function Output({ inputIterables, animationStep }: Props) {
  const outputIterables: IterableObject[] = [];

  const minIterableLength = Math.min(
    ...inputIterables.map((iterable) => iterable.items.length)
  );
  const showMinLengthIterable = animationStep > 0;

  if (animationStep >= itemsMoveBegin) {
    range(itemsMoveBegin, animationStep + 1).forEach((count) => {
      const in_row = (count - itemsMoveBegin) % inputIterables.length;
      const in_col = Math.floor(
        (count - itemsMoveBegin) / inputIterables.length
      );

      const out_row = in_col;
      const out_col = in_row;

      while (outputIterables.length <= out_row) {
        outputIterables.push({
          id: out_row.toString(),
          animateEntry: false,
          exiting: false,
          items: [],
        });
      }
      outputIterables[out_row].items[out_col] = {
        id: inputIterables[in_row].items[in_col].id + "-out",
        value: inputIterables[in_row].items[in_col].value,
        animateEntry: false,
      };
    });
  }

  return (
    <Wrapper>
      {showMinLengthIterable && (
        <MinIterableLength
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          Min iterable length:{" "}
          <MinLength
            initial={{ scale: 3 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {minIterableLength}
          </MinLength>
        </MinIterableLength>
      )}
      <IterableList iterables={outputIterables} allowMutation={false} />
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)``;

const MinIterableLength = styled(motion.p)`
  font-size: 1rem;
  font-family: var(--font-family-mono);
`;

const MinLength = styled(motion.strong)`
  display: inline-block;
`;

export default Output;
