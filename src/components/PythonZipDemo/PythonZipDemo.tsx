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

function PythonZipDemo() {
  const {
    data: inputIterables,
    shortestIterableIndex,
    shortestIterableLength,
    addIterable,
    removeIterable,
    addItem,
    removeItem,
    updateItem,
  } = useIterablesData(true);
  const [animationStep, setAnimationStep] = React.useState(0);
  const [status, setStatus] = React.useState<AnimationStatus>("editing");

  function maxAnimationSteps() {
    return shortestIterableLength * inputIterables.length + 2;
  }

  function reset() {
    setStatus("editing");
    setAnimationStep(0);
  }

  const isPlaying = status === "playing";
  const isEditing = status === "editing";
  const isViewing = status === "viewing";

  const highlightIgnoredItems = animationStep > 1;
  const highlightShortestIterable = animationStep == 1;
  const showIterableControls = isEditing;

  let ignoredElementsExist = false;
  // Mark with boop and cross out
  const markedInputIterables = produce(inputIterables, (draft) => {
    draft.forEach((iterable, iterableIndex) =>
      iterable.items.forEach((item, itemIndex) => {
        function isTransitioned(itemIndex: number, iterableIndex: number) {
          return (
            animationStep - 3 >=
            itemIndex * inputIterables.length + iterableIndex
          );
        }

        const shouldIgnore =
          highlightIgnoredItems && itemIndex >= shortestIterableLength;

        if (shouldIgnore) {
          item.status = "ignored";
          ignoredElementsExist = true;
          return;
        }

        // Item being transitioned now
        const itemTransitioning =
          animationStep - 3 ==
            itemIndex * inputIterables.length + iterableIndex && isPlaying;
        if (itemTransitioning) {
          item.status = "transitioning";
          return;
        }

        item.status =
          !isTransitioned(itemIndex, iterableIndex) && isPlaying
            ? "pending"
            : "transitioned";
      })
    );
  });

  const inputBoard = (
    <InputBoard>
      <IterableList
        key={"input"}
        iterables={markedInputIterables}
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
      {!isEditing && (
        <OutputIterables
          inputIterables={markedInputIterables}
          animationStep={animationStep}
        />
      )}
    </OutputBoard>
  );

  const inputCode = <InputIterablesCode inputIterables={inputIterables} />;

  const outputPrintedValue = isViewing && (
    <OutputPrintedValue
      inputIterables={inputIterables}
      animationStep={animationStep}
    />
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
          onAnimationStepChange={(step) => setAnimationStep(step)}
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
