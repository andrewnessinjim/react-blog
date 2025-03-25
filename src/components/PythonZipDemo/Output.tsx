import { motion } from "framer-motion";
import styled from "styled-components";
import IterableList from "./IterableList";
import { DemoStatus, IterableObject } from "./types";
import { OutputPrintedValueCode } from "./PythonCode";

interface OutputProps {
  outputIterables: IterableObject[];
}

interface OutputLogsProps {
  status: DemoStatus;
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
  status,
  ignoredElementsExist,
  minIterableLength,
}: OutputLogsProps) {
  const showShortestIterable =
    status === "mark_shortest_iterable" ||
    status === "mark_ignored_items" ||
    status === "moving" ||
    status === "viewing" ||
    status === "resetting";

  const showIgnoredElementsLabel =
    status === "mark_ignored_items" ||
    status === "moving" ||
    status === "viewing" ||
    status === "resetting";

  const showIgnoredElementsLabelExists =
    ignoredElementsExist && showIgnoredElementsLabel;
  const showIgnoredElementsLabelNotExists =
    !ignoredElementsExist && showIgnoredElementsLabel;

  return (
    <>
      {showShortestIterable && (
        <LogLabel {...labelAnimation}>
          Shortest iterable length:{" "}
          <MinLength {...valueAnimation}>{minIterableLength}</MinLength>
        </LogLabel>
      )}
      {showIgnoredElementsLabelExists && (
        <LogLabel {...labelAnimation}>Items ignored: ❌</LogLabel>
      )}
      {showIgnoredElementsLabelNotExists && (
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
