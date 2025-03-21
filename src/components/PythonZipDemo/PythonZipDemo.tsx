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
import OutputUnderlay from "./OutputUnderlay";
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
  const renderOutputUnderlay = animationStep > 1;
  const showIterableControls = isEditing;

  let ignoredElementsExist = false;
  // Mark with boop and cross out
  const markedInputIterables = produce(inputIterables, (draft) => {
    draft.forEach((iterable, iterableIndex) =>
      iterable.items.forEach((item, itemIndex) => {
        const shouldIgnore =
          highlightIgnoredItems && itemIndex >= shortestIterableLength;
        item.crossedOut = shouldIgnore;

        if (
          animationStep - 3 ==
            itemIndex * inputIterables.length + iterableIndex &&
          isPlaying
        ) {
          // Item being moved now
          item.boop = true;
        }

        if (shouldIgnore) ignoredElementsExist = true;
      })
    );
  });

  const inputBoard = (
    <InputBoard>
      <InputOverlayWrapper>
        <OutputUnderlayWrapper>
          {renderOutputUnderlay && (
            <OutputUnderlay
              inputIterables={markedInputIterables}
              animationStep={animationStep}
            />
          )}
          <CoverBlanket />
        </OutputUnderlayWrapper>
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
      </InputOverlayWrapper>

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
          inputIterables={inputIterables}
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

const InputOverlayWrapper = styled.div`
  position: relative;
`;

const OutputUnderlayWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const CoverBlanket = styled.div`
  /* Ensure underlay animations are not visible  */
  position: absolute;
  inset: -8px;
  background-color: var(--color-backdrop);
`;

const IterableControls = styled(motion.div)`
  display: flex;
  gap: var(--gap);
  align-self: center;
  position: relative;
`;

const OutputBoard = styled.div``;

export default PythonZipDemo;
