import styled from "styled-components";
import StyledRadioGroup from "../StyledRadioGroup";
import Button from "../Button";
import React from "react";

import { useAnimate } from "framer-motion";

export type Mode = "auto" | "manual" | "";
type Status = "idle" | "playing" | "paused";

type AnimateType = ReturnType<typeof useAnimate>[1];

interface Props {
  animate: AnimateType;
  getAnimationSteps: (mode: Mode) => [];
  onStepChange: (step: number) => void;
}

function ControlPanel({ animate, getAnimationSteps, onStepChange }: Props) {
  const [mode, setMode] = React.useState<Mode>("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [currentStep, setCurrentStep] = React.useState(0);
  const [animationSteps, setAnimationSteps] = React.useState([]);

  React.useEffect(() => {
    animate(animationSteps[currentStep]);
  }, [animate, animationSteps, currentStep]);

  React.useEffect(() => {
    if (mode === "auto" && status === "playing") {
      const timer = setInterval(() => {
        console.log("interval");
        setCurrentStep((prevStep) => {
          const nextStep = prevStep + 1;
          if (validateStep(nextStep)) {
            onStepChange(nextStep);
            return nextStep;
          } else {
            clearInterval(timer);
            return prevStep;
          }
        });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [mode, status]);

  function validateStep(step: number) {
    return step >= 0 && step < animationSteps.length;
  }

  function handleStep(step: number) {
    if (validateStep(step)) {
      setCurrentStep(step);
      onStepChange(step);
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
            value={mode}
            onChange={(value) => {
              setAnimationSteps(getAnimationSteps(value as Mode));
              setMode(value as Mode);
            }}
          />
          <Button
            variant="primary"
            size="regular"
            onClick={() => {
              setStatus("playing");
            }}
          >
            Start
          </Button>
        </>
      )}
      {isManualPlaying && (
        <>
          <Button onClick={() => handleStep(currentStep - 1)}>Previous</Button>
          <Button onClick={() => handleStep(currentStep + 1)}>Next</Button>
        </>
      )}
      {(isAutoPlaying || isAutoPaused) && (
        <>
          <Button onClick={() => setStatus("playing")}>Play</Button>
          <Button onClick={() => setStatus("paused")}>Pause</Button>
        </>
      )}
      <Button
        variant="secondary"
        onClick={() => {
          handleStep(0);
          setStatus("idle");
        }}
      >
        Cancel
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
