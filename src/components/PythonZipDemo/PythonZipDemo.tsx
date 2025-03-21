"use client";

import * as React from "react";
import styled from "styled-components";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import useIterablesData from "./useIterablesData";
import Button from "../Button";
import IterableList from "./IterableList";
import OutputUnderlay from "./OutputUnderlay";
import { OutputIterables, OutputLogs, OutputPrintedValue } from "./Output";
import { InputIterablesCode } from "./PythonCode";
import { produce } from "immer";

type Status = "editing" | "playing" | "viewing" | "paused";
function PythonZipDemo() {
  const {
    data: inputIterables,
    addIterable,
    removeIterable,
    addItem,
    removeItem,
    updateItem,
  } = useIterablesData(true);

  const [animationStep, setAnimationStep] = React.useState(0);
  const [status, setStatus] = React.useState<Status>("editing");

  React.useEffect(() => {
    if (status === "playing") {
      const timeoutIt = setTimeout(nextStep, 1250);
      return () => clearTimeout(timeoutIt);
    }
  }, [status, animationStep]);

  function runAnimation() {
    setAnimationStep(0);
    setStatus("playing");
  }

  function reset() {
    setStatus("editing");
    setAnimationStep(0);
  }

  function nextStep() {
    if (animationStep < minIterableLength * inputIterables.length + 2) {
      setAnimationStep((prev) => prev + 1);
    } else {
      setStatus("viewing");
    }
  }

  function smallestIterableIndex() {
    return inputIterables.reduce(
      (smallestIndex, iterable, index) =>
        iterable.items.length < inputIterables[smallestIndex].items.length
          ? index
          : smallestIndex,
      0
    );
  }

  const showIterableControls = status === "editing";
  const isPlaying = status === "playing";
  const isPaused = status === "paused";
  const isEditing = status === "editing";
  const isViewing = status === "viewing";

  const minIterableLength = Math.min(
    ...inputIterables.map((iterable) => iterable.items.length)
  );

  const highlightMinLengthIterable = animationStep == 1;
  const highlightIgnoredItems = animationStep > 1;
  let ignoredElementsExist = false;

  // Mark with boop and cross out
  const markedInputIterables = produce(inputIterables, (draft) => {
    draft.forEach((iterable, iterableIndex) =>
      iterable.items.forEach((item, itemIndex) => {
        const shouldIgnore =
          highlightIgnoredItems && itemIndex >= minIterableLength;
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

  const ResetButton = (
    <Button variant="secondary" size="regular" onClick={reset}>
      Reset
    </Button>
  );

  const PauseButton = (
    <Button
      variant="secondary"
      size="regular"
      onClick={() => setStatus("paused")}
    >
      Pause
    </Button>
  );
  const ResumeButton = (
    <Button
      variant="secondary"
      size="regular"
      onClick={() => setStatus("playing")}
    >
      Resume
    </Button>
  );

  return (
    <LayoutGroup>
      <Wrapper>
        <DrawingBoard>
          <InputOverlayWrapper>
            <OutputUnderlayWrapper>
              <OutputUnderlay
                inputIterables={inputIterables}
                animationStep={animationStep}
              />
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
                highlightMinLengthIterable ? smallestIterableIndex() : undefined
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
              minIterableLength={minIterableLength}
            />
          )}
        </DrawingBoard>
        <PythonCodeWrapper>
          <InputIterablesCode inputIterables={inputIterables} />
        </PythonCodeWrapper>
        <OutputIterablesWrapper>
          {!isEditing && (
            <OutputIterables
              inputIterables={inputIterables}
              animationStep={animationStep}
            />
          )}
        </OutputIterablesWrapper>

        <AnimationControls>
          {(isPlaying || isPaused) && (
            <>
              {ResetButton}
              {isPlaying && PauseButton}
              {isPaused && ResumeButton}
            </>
          )}
          {isEditing && (
            <Button variant="primary" size="regular" onClick={runAnimation}>
              Play Animation
            </Button>
          )}
          {isViewing && ResetButton}
        </AnimationControls>

        {isViewing && (
          <OutputPrintedValue
            inputIterables={inputIterables}
            animationStep={animationStep}
          />
        )}
      </Wrapper>
    </LayoutGroup>
  );
}

const Wrapper = styled.div`
  --gap: 8px;
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  grid-template-rows: 240px auto auto auto;
  grid-template-areas:
    "drawing-board output-board"
    "controls output-board"
    "code printed-value";

  gap: 24px;
  padding: 16px;
  min-height: 520px;
  max-width: 620px;
  margin-inline-start: auto;
  margin-inline-end: auto;
`;

const DrawingBoard = styled.div`
  grid-area: drawing-board;
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  flex: 1.5;
  width: 272px;
`;

const InputOverlayWrapper = styled.div`
  position: relative;
`;

const AnimationControls = styled.div`
  display: flex;
  gap: var(--gap);
  justify-content: center;
  grid-area: controls;
`;

const PythonCodeWrapper = styled.div`
  grid-area: code;
`;

const OutputIterablesWrapper = styled.div`
  grid-area: output-board;
`;

const OutputUnderlayWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const CoverBlanket = styled.div`
  position: absolute;
  inset: 0;
  right: -35%;
  left: -35%;
  top: -35%;
  bottom: -35%;
  background-color: var(--color-backdrop);
`;

const IterableControls = styled(motion.div)`
  display: flex;
  gap: var(--gap);
  align-self: center;
  position: relative;
`;

export default PythonZipDemo;
