"use client";

import * as React from "react";
import AnimationStepController from "./AnimationStepController";
import { DemoStatus } from "./types";
import styled from "styled-components";
import IterableList from "./IterableList";
import { OutputIterables, OutputLogs, OutputPrintedValue } from "./Output";
import { InputIterablesCode } from "./PythonCode";
import LayoutManager from "./LayoutManager";
import IterableItemPosition from "./IterableItemPosition";
import { useReducedMotion } from "framer-motion";
import { useZipIterables } from "./hooks";

const INIT_CURRENT_ITEM_POSITION = new IterableItemPosition(-1, 0);
function PythonZipDemo() {
  const {
    inputIterables,
    outputIterables,
    addInputIterable,
    removeInputIterable,
    addInputItem,
    removeInputItem,
    updateInputItem,
    reset: resetData,
    moveFromInputToOutput,
    markIgnoredAndPendingItems,
    markAllUnignoredItemsAsTransitioned,
    shortestIterableIndex,
    shortestIterableLength,
  } = useZipIterables();

  const [status, setStatus] = React.useState<DemoStatus>("editing");
  const [currentItemPosition, setCurrentItemPosition] =
    React.useState<IterableItemPosition | null>(INIT_CURRENT_ITEM_POSITION);

  const prefersReducedMotion = useReducedMotion() ?? false;

  function getNextItemPosition() {
    return (
      currentItemPosition?.nextColWise(
        inputIterables.length,
        shortestIterableLength
      ) ?? null
    );
  }

  function isDemoEnd() {
    // const nextItemPosition = getNextItemPosition();
    return status === "viewing";
  }

  function reset() {
    const nextStatus = "editing";
    setStatus(nextStatus);

    const nextItemPos = INIT_CURRENT_ITEM_POSITION;
    setCurrentItemPosition(nextItemPos);

    resetData();
  }

  const isEditing = status === "editing";
  const isViewing = status === "viewing";

  const highlightShortestIterable = status === "mark_shortest_iterable";

  const ignoredElementsExist = inputIterables.some((iterable) =>
    iterable.items.some((item) => item.status === "ignored")
  );

  function nextDemoStep() {
    const nextItemPos = getNextItemPosition();

    const statusFlow: Record<DemoStatus, DemoStatus> = {
      editing: "waiting",
      waiting: "mark_shortest_iterable",
      mark_shortest_iterable: "mark_ignored_items",
      mark_ignored_items: "moving",
      moving:
        nextItemPos === null
          ? prefersReducedMotion
            ? "resetting"
            : "viewing"
          : "moving",
      resetting: "viewing",
      viewing: "viewing",
    };

    const nextStatus = statusFlow[status];
    setStatus(nextStatus);

    if (nextStatus === "mark_ignored_items") {
      markIgnoredAndPendingItems();
    }

    if (nextStatus === "moving") {
      setCurrentItemPosition(nextItemPos);
      if (nextItemPos) moveFromInputToOutput(nextItemPos);
    }

    if (nextStatus === "resetting") {
      markAllUnignoredItemsAsTransitioned();
    }
  }

  const inputBoard = (
    <InputBoard>
      <IterableList
        key={"input"}
        iterables={inputIterables}
        addItem={addInputItem}
        removeItem={removeInputItem}
        updateItem={updateInputItem}
        allowMutation={isEditing}
        highlightIndex={
          highlightShortestIterable ? shortestIterableIndex : undefined
        }
        onEdit={reset}
        addInputIterable={addInputIterable}
        removeInputIterable={removeInputIterable}
      />

      <OutputLogs
        status={status}
        ignoredElementsExist={ignoredElementsExist}
        minIterableLength={shortestIterableLength}
      />
    </InputBoard>
  );

  const outputBoard = (
    <OutputBoard>
      {!isEditing && <OutputIterables outputIterables={outputIterables} />}
    </OutputBoard>
  );

  const inputCode = <InputIterablesCode inputIterables={inputIterables} />;

  const outputPrintedValue = isViewing && (
    <OutputPrintedValue outputIterables={outputIterables} />
  );

  console.log({ status, currentItemPosition });

  return (
    <LayoutManager
      inputBoard={inputBoard}
      outputBoard={outputBoard}
      inputCode={inputCode}
      outputPrintedValue={outputPrintedValue}
      animationControls={
        <AnimationStepController
          stepsEnded={isDemoEnd}
          onReset={reset}
          onNextStep={nextDemoStep}
        />
      }
    />
  );
}

const InputBoard = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  flex: 1.5;
  width: 272px;
`;

const OutputBoard = styled.div``;

export default PythonZipDemo;
