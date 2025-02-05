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
import { MEDIA_QUERIES } from "@/constants";
import DemoVideo from "../DemoVideo";
import useMediaQuery from "@/hooks/useMediaQuery";

interface Props {
  withIndex: boolean;
}

function DatabaseIndexDemo({ withIndex }: Props) {
  const drawingBoardWidth = 800;
  const drawingBoardHeight = drawingBoardWidth / 1.618;

  const [scope, animate] = useAnimate();
  const [currentStep, setCurrentStep] = React.useState(0);

  const isMobile = useMediaQuery(MEDIA_QUERIES.tabletAndBelow);

  if (isMobile) {
    return (
      <MobileContent>
        {withIndex ? (
          <>
            <p>
              Again, you can watch the below video to visualize this and play
              around with the demo later on a wider screen.
            </p>
            <DemoVideo videoId="demoWithIndex" />
          </>
        ) : (
          <>
            <p>
              I built a demo that you can step through to visualize this flow,
              but it works only on wider screens. You can watch the video below
              now and play around with the demo on a wider screen later.
            </p>
            <DemoVideo videoId="demoWithoutIndex" />
          </>
        )}
      </MobileContent>
    );
  }
  return (
    <DesktopContent
      style={
        {
          "--width": drawingBoardWidth + "px",
          "--height": drawingBoardHeight + "px",
        } as React.CSSProperties
      }
    >
      <DrawingBoard ref={scope}>
        {withIndex ? (
          <WithIndexAnimation />
        ) : (
          <WithoutIndexAnimation currentStep={currentStep} />
        )}
      </DrawingBoard>
      <Spacer size={24} />
      <ControlPanel
        animate={animate}
        // @ts-ignore
        animationSteps={
          withIndex ? withIndexAnimationSteps : withoutIndexAnimationSteps
        }
        onStepChange={(stepNum: number) => setCurrentStep(stepNum)}
      />
    </DesktopContent>
  );
}

const DesktopContent = styled.div``;

const MobileContent = styled.div``;

const DrawingBoard = styled.div`
  border: 3px solid var(--color-gray-500);
  width: var(--width);
  height: var(--height);
  margin-inline-start: auto;
  margin-inline-end: auto;
  position: relative;
`;

export default DatabaseIndexDemo;
