"use client";

import * as React from "react";
import AnimationStepController from "./AnimationStepController";
import useIterablesData from "./useIterablesData";
import { produce } from "immer";
import { DemoStatus } from "./types";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../Button";
import IterableList from "./IterableList";
import { OutputIterables, OutputLogs, OutputPrintedValue } from "./Output";
import { InputIterablesCode } from "./PythonCode";
import LayoutManager from "./LayoutManager";
import IterableItemPosition from "./IterableItemPosition";

const INIT_CURRENT_ITEM_POSITION = new IterableItemPosition(-1, 0);
function PythonZipDemo() {
  const {
    data: inputIterables,
    setData: setInputIterables,
    shortestIterableIndex,
    shortestIterableLength,
    addIterable,
    removeIterable,
    addItem,
    removeItem,
    updateItem,
  } = useIterablesData(true);
  const {
    data: outputIterables,
    upsert: upsertOutput,
    setData: setOutputIterables,
  } = useIterablesData(false);

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

    updateItemStatuses(nextItemPos, nextStatus);
    setOutputIterables([]);
  }

  const isEditing = status === "editing";
  const isViewing = status === "viewing";

  const highlightShortestIterable = status === "mark_shortest_iterable";
  const showIterableControls = isEditing;

  let ignoredElementsExist = false;
  for (let iterable of inputIterables) {
    for (let item of iterable.items) {
      if (item.status == "ignored") {
        ignoredElementsExist = true;
        break;
      }
    }
  }

  function updateItemStatuses(
    nextItemPosition: IterableItemPosition,
    nextStatus: DemoStatus
  ) {
    const nextInputIterables = produce(inputIterables, (draft) => {
      draft.forEach((iterable, iterableIndex) =>
        iterable.items.forEach((item, itemIndex) => {
          if (nextStatus === "editing") {
            item.status = "not_started";
            return;
          }

          if (
            itemIndex >= shortestIterableLength &&
            (nextStatus === "mark_ignored_items" ||
              nextStatus === "moving" ||
              nextStatus === "viewing")
          ) {
            item.status = "ignored";
            return;
          }

          const itemPosition = new IterableItemPosition(
            iterableIndex,
            itemIndex
          );
          if (nextItemPosition.isEqual(itemPosition)) {
            item.status = "transitioning";
          } else if (
            itemPosition.isBefore(nextItemPosition) &&
            !nextItemPosition.isEqual(INIT_CURRENT_ITEM_POSITION) &&
            !isEditing
          ) {
            item.status = "transitioned";
            return;
          } else {
            item.status = "pending";
          }
        })
      );
    });
    setInputIterables(nextInputIterables);

    for (
      let iterableIndex = 0;
      iterableIndex < nextInputIterables.length;
      iterableIndex++
    ) {
      for (let itemIndex = 0; itemIndex < shortestIterableLength; itemIndex++) {
        const iterableItem = nextInputIterables[iterableIndex].items[itemIndex];
        if (
          iterableItem.status === "transitioned" ||
          iterableItem.status === "transitioning"
        ) {
          upsertOutput(itemIndex, iterableIndex, {
            ...iterableItem,
            id: iterableItem.id + "-out",
            status: "transitioned",
            animateEntry: false,
          });
        }
      }
    }
  }

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
      updateItemStatuses(nextItemPos, nextStatus);
    }
  }

  const inputBoard = (
    <InputBoard>
      <IterableList
        key={"input"}
        iterables={inputIterables}
        addItem={addItem}
        removeItem={removeItem}
        updateItem={updateItem}
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
                addIterable();
              }}
            >
              Add
            </Button>
            <Button
              variant="secondary"
              size="regular"
              onClick={() => {
                reset();
                removeIterable();
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
