import styled from "styled-components";
import { ZipDemoStatus } from "../types";
import { motion } from "framer-motion";
import { labelAnimation, Length, LogLabel, OutputLogsWrapper, valueAnimation } from "../OutputLogs";

interface OutputLogsProps {
  status: ZipDemoStatus;
  ignoredElementsExist: boolean;
  minIterableLength: number;
}

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
    <OutputLogsWrapper>
      {showShortestIterable && (
        <LogLabel {...labelAnimation}>
          Shortest iterable length:{" "}
          <Length {...valueAnimation}>{minIterableLength}</Length>
        </LogLabel>
      )}
      {showIgnoredElementsLabelExists && (
        <LogLabel {...labelAnimation}>Items ignored: ❌</LogLabel>
      )}
      {showIgnoredElementsLabelNotExists && (
        <LogLabel {...labelAnimation}>No items ignored: ✅</LogLabel>
      )}
    </OutputLogsWrapper>
  );
}
