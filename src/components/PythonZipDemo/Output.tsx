import { motion } from "framer-motion";
import styled from "styled-components";
import IterableList from "./IterableList";
import { IterableObject } from "./types";
import { range } from "lodash-es";
import { OutputPrintedValueCode } from "./PythonCode";

interface OutputProps {
  inputIterables: IterableObject[];
  animationStep: number;
}

interface OutputLogsProps {
  animationStep: number;
  ignoredElementsExist: boolean;
  minIterableLength: number;
}

const itemsMoveBegin = 3;

const labelAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.35 },
};

const valueAnimation = {
  initial: { scale: 3 },
  animate: { scale: 1 },
  transition: { duration: 0.5 },
};

function computeOutputIterables(
  inputIterables: IterableObject[],
  animationStep: number
) {
  const outputIterables: IterableObject[] = [];
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
  return outputIterables;
}

export function OutputLogs({
  animationStep,
  ignoredElementsExist,
  minIterableLength,
}: OutputLogsProps) {
  const showMinLengthIterable = animationStep > 0;
  const showIgnoredElementsLabel = ignoredElementsExist && animationStep > 1;

  return (
    <OutputLogsWrapper>
      {showMinLengthIterable && (
        <LogLabel {...labelAnimation}>
          Min iterable length:{" "}
          <MinLength {...valueAnimation}>{minIterableLength}</MinLength>
        </LogLabel>
      )}
      {showIgnoredElementsLabel && (
        <LogLabel {...labelAnimation}>Items ignored: ❌</LogLabel>
      )}
    </OutputLogsWrapper>
  );
}

export function OutputIterables({
  inputIterables,
  animationStep,
}: OutputProps) {
  const outputIterables = computeOutputIterables(inputIterables, animationStep);

  return (
    <OutputIterablesWrapper>
      <IterableList iterables={outputIterables} allowMutation={false} />
    </OutputIterablesWrapper>
  );
}

export function OutputPrintedValue({
  inputIterables,
  animationStep,
}: OutputProps) {
  const outputIterables = computeOutputIterables(inputIterables, animationStep);
  return <OutputPrintedValueCode outputIterables={outputIterables} />;
}
const OutputIterablesWrapper = styled(motion.div)``;
const OutputLogsWrapper = styled(motion.div)`
  position: relative; /* Stay above CoverBlanket */
`;

const LogLabel = styled(motion.p)`
  font-size: 1rem;
  font-family: var(--font-family-mono);
  margin: 0;
`;

const MinLength = styled(motion.strong)`
  display: inline-block;
  color: green;
`;
