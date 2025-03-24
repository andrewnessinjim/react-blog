import { motion } from "framer-motion";
import styled from "styled-components";
import IterableList from "./IterableList";
import { IterableObject } from "./types";
import { OutputPrintedValueCode } from "./PythonCode";

interface OutputProps {
  outputIterables: IterableObject[];
}

interface OutputLogsProps {
  animationStep: number;
  ignoredElementsExist: boolean;
  minIterableLength: number;
}

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

export function OutputLogs({
  animationStep,
  ignoredElementsExist,
  minIterableLength,
}: OutputLogsProps) {
  const showShortestIterable = animationStep > 0;
  const showIgnoredElementsLabel = ignoredElementsExist && animationStep > 1;
  const showNoIgnoredElementsLabel = !ignoredElementsExist && animationStep > 1;

  return (
    <>
      {showShortestIterable && (
        <LogLabel {...labelAnimation}>
          Shortest iterable length:{" "}
          <MinLength {...valueAnimation}>{minIterableLength}</MinLength>
        </LogLabel>
      )}
      {showIgnoredElementsLabel && (
        <LogLabel {...labelAnimation}>Items ignored: ❌</LogLabel>
      )}
      {showNoIgnoredElementsLabel && (
        <LogLabel {...labelAnimation}>No items ignored: ✅</LogLabel>
      )}
    </>
  );
}

export function OutputIterables({ outputIterables }: OutputProps) {
  return <IterableList iterables={outputIterables} allowMutation={false} />;
}

export function OutputPrintedValue({ outputIterables }: OutputProps) {
  return <OutputPrintedValueCode outputIterables={outputIterables} />;
}

const LogLabel = styled(motion.p)`
  font-size: 1rem;
  font-family: var(--font-family-mono);
  margin: 0;
`;

const MinLength = styled(motion.strong)`
  display: inline-block;
  color: green;
`;
