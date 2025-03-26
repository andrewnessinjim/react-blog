import { ZipLongDemoStatus } from "./types";

import {
  labelAnimation,
  Length,
  LogLabel,
  OutputLogsWrapper,
  valueAnimation,
} from "../OutputLogs";

interface Props {
  status: ZipLongDemoStatus;
  maxIterableLength: number;
  emptySlotsExists: boolean;
}

export function OutputLogs({
  status,
  maxIterableLength,
  emptySlotsExists,
}: Props) {
  const showLongestIterables =
    status === "mark_longest_iterable" ||
    status === "mark_empty_slots" ||
    status === "moving" ||
    status === "viewing" ||
    status === "filling";

  const showEmptySlotsLabel =
    status === "mark_empty_slots" ||
    status === "moving" ||
    status === "viewing" ||
    status === "filling";

  const showEmptySlotsLabelExists = emptySlotsExists && showEmptySlotsLabel;

  const showEmptySlotsLabelNotExists = !emptySlotsExists && showEmptySlotsLabel;

  return (
    <OutputLogsWrapper>
      {showLongestIterables && (
        <LogLabel {...labelAnimation}>
          Longest iterable length:{" "}
          <Length {...valueAnimation}>{maxIterableLength}</Length>
        </LogLabel>
      )}
      {showEmptySlotsLabelExists && (
        <LogLabel {...labelAnimation}>Empty slots found: 🚫</LogLabel>
      )}

      {showEmptySlotsLabelNotExists && (
        <LogLabel {...labelAnimation}>No empty slots: ✅</LogLabel>
      )}
    </OutputLogsWrapper>
  );
}
