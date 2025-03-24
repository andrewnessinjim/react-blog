"use client";

import * as React from "react";
import styled from "styled-components";
import Button from "../Button";

import { AnimationStatus } from "./types";

interface Props {
  maxAnimationSteps: number;
  onAnimationStepChange: (step: number) => void;
  animationStep: number;
  status: AnimationStatus;
  setStatus: (status: AnimationStatus) => void;
  onReset: () => void;
}

function AnimationStepController({
  maxAnimationSteps,
  onAnimationStepChange,
  animationStep,
  status,
  setStatus,
  onReset,
}: Props) {
  React.useEffect(() => {
    function nextStep() {
      if (animationStep < maxAnimationSteps) {
        onAnimationStepChange(animationStep + 1);
      } else {
        setStatus("viewing");
      }
    }

    if (status === "playing") {
      const timeoutId = setTimeout(nextStep, 1250);
      return () => clearTimeout(timeoutId);
    }
  }, [
    status,
    animationStep,
    maxAnimationSteps,
    onAnimationStepChange,
    setStatus,
  ]);

  function runAnimation() {
    onAnimationStepChange(0);
    setStatus("playing");
  }

  const isPlaying = status === "playing";
  const isPaused = status === "paused";
  const isEditing = status === "editing";
  const isViewing = status === "viewing";

  const ResetButton = (
    <Button variant="secondary" size="regular" onClick={onReset}>
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
    <Wrapper>
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
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: var(--gap);
  justify-content: center;
  grid-area: controls;
`;

export default AnimationStepController;
