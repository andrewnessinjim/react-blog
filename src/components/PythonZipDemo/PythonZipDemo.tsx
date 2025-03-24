"use client";

import * as React from "react";
import AnimationStepController from "./AnimationStepController";
import useIterablesData from "./useIterablesData";
import { produce } from "immer";
import { AnimationStatus } from "./types";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../Button";
import IterableList from "./IterableList";
import { OutputIterables, OutputLogs, OutputPrintedValue } from "./Output";
import { InputIterablesCode } from "./PythonCode";
import LayoutManager from "./LayoutManager";
import IterableItemPosition from "./IterableItemPosition";

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

  const [animationStep, setAnimationStep] = React.useState(0);
  const [status, setStatus] = React.useState<AnimationStatus>("editing");
  const [currentItemPosition, setCurrentItemPosition] = React.useState(
    new IterableItemPosition(-1, 0)
  );

  function maxAnimationSteps() {
    return shortestIterableLength * inputIterables.length + 2;
  }

  function reset() {
    setStatus("editing");

    const nextAnimationStep = 0;
    setAnimationStep(nextAnimationStep);

    const nextItemPos = new IterableItemPosition(-1, 0);
    setCurrentItemPosition(nextItemPos);

    updateItemStatuses(nextItemPos, nextAnimationStep);
    setOutputIterables([]);
  }

  const isEditing = status === "editing";
  const isViewing = status === "viewing";

  const highlightShortestIterable = animationStep == 1;
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
    nextAnimationStep: number
  ) {
    const nextInputIterables = produce(inputIterables, (draft) => {
      draft.forEach((iterable, iterableIndex) =>
        iterable.items.forEach((item, itemIndex) => {
          if (nextAnimationStep == 0) {
            item.status = "not_started";
            return;
          }

          if (itemIndex >= shortestIterableLength && nextAnimationStep > 1) {
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
            !nextItemPosition.isEqual(new IterableItemPosition(0, -1)) &&
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
          });
        }
      }
    }
  }

  function updateAnimationStepStatuses(nextStep: number) {
    function nextItemPosition(animationStep: number) {
      if (animationStep > 2) {
        return currentItemPosition.nextColWise(
          inputIterables.length,
          shortestIterableLength
        );
      } else {
        return currentItemPosition;
      }
    }

    setAnimationStep(nextStep);

    const nextItemPos = nextItemPosition(nextStep);
    if (nextItemPos) {
      setCurrentItemPosition(nextItemPos);
      updateItemStatuses(nextItemPos, nextStep);
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

      {!isEditing && (
        <OutputLogs
          animationStep={animationStep}
          ignoredElementsExist={ignoredElementsExist}
          minIterableLength={shortestIterableLength}
        />
      )}
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
          maxAnimationSteps={maxAnimationSteps()}
          onReset={reset}
          onAnimationStepChange={updateAnimationStepStatuses}
          animationStep={animationStep}
          status={status}
          setStatus={setStatus}
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
