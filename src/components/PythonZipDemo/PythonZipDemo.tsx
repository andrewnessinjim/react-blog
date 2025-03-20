"use client";

import * as React from "react";
import styled from "styled-components";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import useIterablesData from "./useIterablesData";
import Button from "../Button";
import PythonCode from "./PythonCode";
import IterableList from "./IterableList";
import { IterableObject } from "./types";
import OutputUnderlay from "./OutputUnderlay";
import Output from "./Output";

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
      const interval = setInterval(() => {
        nextStep();
      }, 1000);
      return () => clearInterval(interval);
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

  const viewingOrAnimatingOrPaused =
    status === "viewing" || status === "playing" || status === "paused";
  const showIterableControls = status === "editing" || status === "viewing";
  const isPlaying = status === "playing";
  const isPaused = status === "paused";

  const minIterableLength = Math.min(
    ...inputIterables.map((iterable) => iterable.items.length)
  );

  const highlightMinLengthIterable = animationStep == 1;
  const highlightIgnoredItems = animationStep > 1;
  let ignoredElementsExist = false;

  const inputIterablesWithIgnoredItems = inputIterables.map((iterable) => {
    return {
      ...iterable,
      items: iterable.items.map((item, itemIndex) => {
        const shouldIgnore =
          highlightIgnoredItems && itemIndex >= minIterableLength;

        if (shouldIgnore) {
          ignoredElementsExist = true;
        }

        return {
          ...item,
          crossedOut: shouldIgnore,
        };
      }),
    };
  });

  console.log(inputIterablesWithIgnoredItems);

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
              iterables={inputIterablesWithIgnoredItems}
              addItem={addItem}
              removeItem={removeItem}
              updateItem={updateItem}
              allowMutation={!isPlaying && !isPaused}
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
                    setStatus("editing");
                    addIterable();
                  }}
                >
                  Add Iterable
                </Button>
                <Button
                  variant="secondary"
                  size="regular"
                  onClick={() => {
                    setStatus("editing");
                    removeIterable();
                  }}
                >
                  Remove Iterable
                </Button>
              </IterableControls>
            )}
          </AnimatePresence>
        </DrawingBoard>
        <CodeAndNavigation>
          <PythonCode inputIterables={inputIterables} />
          {isPlaying || isPaused ? (
            <AnimationControls>
              {ResetButton}
              {isPlaying && PauseButton}
              {isPaused && ResumeButton}
            </AnimationControls>
          ) : (
            <Button variant="primary" size="regular" onClick={runAnimation}>
              Run Code
            </Button>
          )}
        </CodeAndNavigation>
        <ZippedOutput>
          {viewingOrAnimatingOrPaused && (
            <Output
              ignoredElementsExist={ignoredElementsExist}
              inputIterables={inputIterables}
              animationStep={animationStep}
            />
          )}
        </ZippedOutput>
      </Wrapper>
    </LayoutGroup>
  );
}

const Wrapper = styled.div`
  --gap: 10px;
  display: flex;
  gap: var(--gap);
  /* border: 1px dotted white; */
  padding: 16px;
  min-height: 480px;
`;

const DrawingBoard = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  max-width: fit-content;
  flex: 1;
  min-width: 300px;
`;

const InputOverlayWrapper = styled.div`
  position: relative;
`;

const CodeAndNavigation = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: var(--gap);
`;

const AnimationControls = styled.div`
  display: flex;
  gap: var(--gap);
  justify-content: center;
`;

const OutputUnderlayWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  /* border: 5px dotted pink; */
`;

const CoverBlanket = styled.div`
  position: absolute;
  inset: 0;
  right: -35%;
  left: -35%;
  top: -35%;
  bottom: -35%;
  background-color: var(--color-backdrop);
  /* border: 5px dotted fuchsia; */
`;

const ZippedOutput = styled.div`
  flex: 1;
`;

const IterableControls = styled(motion.div)`
  display: flex;
  gap: var(--gap);
  align-self: center;
  position: relative;
`;

export default PythonZipDemo;
