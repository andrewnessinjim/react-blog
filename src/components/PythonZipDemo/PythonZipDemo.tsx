"use client";

import * as React from "react";
import AnimationStepController from "./AnimationStepController";
import { DemoStatus } from "./types";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../Button";
import IterableList from "./IterableList";
import { OutputIterables, OutputLogs, OutputPrintedValue } from "./Output";
import { InputIterablesCode } from "./PythonCode";
import LayoutManager from "./LayoutManager";
import IterableItemPosition from "./IterableItemPosition";
import useInputAndOutputIterables from "./useInputAndOutputIterables";

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
    resetInputAndOutput,
    moveFromInputToOutput,
    shortestIterableIndex,
    shortestIterableLength,
  } = useInputAndOutputIterables();

  const [status, setStatus] = React.useState<DemoStatus>("editing");
  const [currentItemPosition, setCurrentItemPosition] = React.useState(
    INIT_CURRENT_ITEM_POSITION
  );

  function getNextItemPosition() {
    return currentItemPosition.nextColWise(
      inputIterables.length,
      shortestIterableLength
    );
  }

  function isDemoEnd() {
    const nextItemPosition = getNextItemPosition();
    return nextItemPosition === null;
  }

  function reset() {
    const nextStatus = "editing";
    setStatus(nextStatus);

    const nextItemPos = INIT_CURRENT_ITEM_POSITION;
    setCurrentItemPosition(nextItemPos);

    resetInputAndOutput();
  }

  const isEditing = status === "editing";
  const isViewing = status === "viewing";

  const highlightShortestIterable = status === "mark_shortest_iterable";
  const showIterableControls = isEditing;

  const ignoredElementsExist = inputIterables.some((iterable) =>
    iterable.items.some((item) => item.status === "ignored")
  );

  function nextDemoStep() {
    const statusFlow: Record<DemoStatus, DemoStatus> = {
      editing: "waiting",
      waiting: "mark_shortest_iterable",
      mark_shortest_iterable: "mark_ignored_items",
      mark_ignored_items: "moving",
      moving: isDemoEnd() ? "viewing" : "moving",
      viewing: "viewing",
    };

    const nextStatus = statusFlow[status];
    setStatus(nextStatus);

    const nextItemPos =
      nextStatus === "moving" ? getNextItemPosition() : currentItemPosition;

    if (nextItemPos) {
      setCurrentItemPosition(nextItemPos);
      const shouldMarkIgnoredItems =
        nextStatus === "mark_ignored_items" ||
        nextStatus === "moving" ||
        nextStatus === "viewing";

      moveFromInputToOutput(nextItemPos, shouldMarkIgnoredItems);
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
      />

      <AnimatePresence>
        {showIterableControls && (
          <IterableControls
            layout={true}
            exit={{ opacity: 0 }}
            key={"controls"}
          >
            <Button
              variant="secondary"
              size="regular"
              onClick={() => {
                reset();
                addInputIterable();
              }}
            >
              Add
            </Button>
            <Button
              variant="secondary"
              size="regular"
              onClick={() => {
                reset();
                removeInputIterable();
              }}
            >
              Remove
            </Button>
          </IterableControls>
        )}
      </AnimatePresence>

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

  console.log(inputIterables, outputIterables);

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

const IterableControls = styled(motion.div)`
  display: flex;
  gap: var(--gap);
  align-self: center;
  position: relative;
`;

const OutputBoard = styled.div``;

export default PythonZipDemo;
