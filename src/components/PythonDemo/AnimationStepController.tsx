"use client";

import * as React from "react";
import styled from "styled-components";
import Button from "../Button";

import { AnimationStatus } from "./types";
import { motion } from "framer-motion";

interface Props {
  stepsEnded: () => boolean;
  onNextStep: () => void;
  onReset: () => void;
}

function AnimationStepController({ stepsEnded, onNextStep, onReset }: Props) {
  const [status, setStatus] = React.useState<AnimationStatus>("not_started");
  React.useEffect(() => {
    function nextStep() {
      if (stepsEnded()) {
        setStatus("ended");
      } else {
        onNextStep();
      }
    }

    if (status === "playing") {
      const timeoutId = setTimeout(nextStep, 1250);
      return () => clearTimeout(timeoutId);
    }
  }, [status, stepsEnded, onNextStep]);

  function runAnimation() {
    onNextStep();
    setStatus("playing");
  }

  const isPlaying = status === "playing";
  const isPaused = status === "paused";
  const notStarted = status === "not_started";
  const isEnded = status === "ended";

  const ResetButton = (
    <Button
      variant="secondary"
      size="regular"
      onClick={() => {
        setStatus("not_started");
        onReset();
      }}
    >
      Reset
    </Button>
  );

  const PlayButton = (
    <Button variant="primary" size="regular" onClick={runAnimation}>
      Play Animation
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
    <Wrapper layout="position">
      {isPlaying && PauseButton}
      {isPaused && ResumeButton}
      {notStarted && PlayButton}
      {(isEnded || isPlaying || isPaused) && ResetButton}
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  display: flex;
  gap: var(--gap);
  justify-content: center;
  grid-area: controls;
`;

export default AnimationStepController;
