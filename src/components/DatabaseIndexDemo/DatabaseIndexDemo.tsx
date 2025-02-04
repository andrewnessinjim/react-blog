"use client";

import * as React from "react";
import styled from "styled-components";

import { useAnimate } from "framer-motion";
import Spacer from "../Spacer";
import ControlPanel from "./ControlPanel";

import {
  WithIndexAnimation,
  withIndexAnimationSteps,
  WithoutIndexAnimation,
  withoutIndexAnimationSteps,
} from "./Animations";

interface Props {
  withIndex: boolean;
}

function DatabaseIndexDemo({ withIndex }: Props) {
  const drawingBoardWidth = 800;
  const drawingBoardHeight = drawingBoardWidth / 1.618;

  const [scope, animate] = useAnimate();
  const [currentStep, setCurrentStep] = React.useState(0);

  return (
    <Wrapper
      style={{
        "--width": drawingBoardWidth + "px",
        "--height": drawingBoardHeight + "px",
      }}
    >
      <DrawingBoard ref={scope}>
        {withIndex ? (
          <WithIndexAnimation currentStep={currentStep} />
        ) : (
          <WithoutIndexAnimation currentStep={currentStep} />
        )}
      </DrawingBoard>
      <Spacer size={24} />
      <ControlPanel
        animate={animate}
        animationSteps={
          withIndex ? withIndexAnimationSteps : withoutIndexAnimationSteps
        }
        onStepChange={(stepNum: number) => setCurrentStep(stepNum)}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const DrawingBoard = styled.div`
  border: 3px solid var(--color-gray-500);
  width: var(--width);
  height: var(--height);
  margin-inline-start: auto;
  margin-inline-end: auto;
  position: relative;
`;

export default DatabaseIndexDemo;
