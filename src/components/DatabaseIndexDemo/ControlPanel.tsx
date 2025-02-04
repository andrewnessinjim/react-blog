import styled from "styled-components";
import StyledRadioGroup from "../StyledRadioGroup";
import Button from "../Button";
import React from "react";

import { useAnimate } from "framer-motion";

export type Mode = "auto" | "manual" | undefined;
type Status = "idle" | "playing" | "paused";

type AnimateType = ReturnType<typeof useAnimate>[1];

interface Props {
  animate: AnimateType;
  animationSteps: [];
  onStepChange: (step: number) => void;
}

function ControlPanel({ animate, animationSteps, onStepChange }: Props) {
  const [mode, setMode] = React.useState<Mode>(undefined);
  const [status, setStatus] = React.useState<Status>("idle");
  const [currentStep, setCurrentStep] = React.useState(0);

  React.useEffect(() => {
    animate(animationSteps[currentStep]);
  }, [animate, animationSteps, currentStep]);

  React.useEffect(() => {
    if (mode === "auto" && status === "playing") {
      const intervalId = setInterval(() => {
        const nextStep = currentStep + 1;
        handleAutoStep(nextStep, intervalId);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [mode, status, currentStep]);

  function validateStep(step: number) {
    return step >= 0 && step < animationSteps.length;
  }

  function handleManualStep(step: number) {
    if (validateStep(step)) {
      setCurrentStep(step);
      onStepChange(step);
    }
  }

  function handleAutoStep(
    step: number,
    intervalId: ReturnType<typeof setInterval>
  ) {
    if (validateStep(step)) {
      onStepChange(step);
      setCurrentStep(step);
    } else {
      clearInterval(intervalId);
    }
  }

  const isIdle = status === "idle";
  const isManualPlaying = mode === "manual" && status === "playing";
  const isAutoPlaying = mode === "auto" && status === "playing";
  const isAutoPaused = mode === "auto" && status === "paused";

  return (
    <Wrapper>
      {isIdle && (
        <>
          <StyledRadioGroup
            options={{
              manual: "Manual",
              auto: "Auto",
            }}
            value={mode ?? ""}
            onChange={(value) => {
              setMode(value as Mode);
            }}
          />
          <Button
            variant="primary"
            size="regular"
            onClick={() => {
              if (mode !== undefined) setStatus("playing");
            }}
          >
            Start
          </Button>
        </>
      )}
      {isManualPlaying && (
        <>
          <Button onClick={() => handleManualStep(currentStep - 1)}>
            Previous
          </Button>
          <Button onClick={() => handleManualStep(currentStep + 1)}>
            Next
          </Button>
        </>
      )}
      {(isAutoPlaying || isAutoPaused) && (
        <>
          <Button
            onClick={() => {
              if (isAutoPlaying) {
                setStatus("paused");
              } else {
                setStatus("playing");
              }
            }}
          >
            {isAutoPlaying ? "Pause" : "Play"}
          </Button>
        </>
      )}
      <Button
        variant="secondary"
        onClick={() => {
          handleManualStep(0);
          setStatus("idle");
        }}
      >
        Done
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: var(--width);
  margin-inline-start: auto;
  margin-inline-end: auto;
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;

export default ControlPanel;
