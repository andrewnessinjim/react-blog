"use client";

import * as React from "react";
import styled from "styled-components";

import personData from "./data.json";
import { Transition, useAnimate, motion } from "framer-motion";
import StyledRadioGroup from "../StyledRadioGroup";
import Spacer from "../Spacer";
import Button from "../Button";
import { range } from "lodash-es";
import MemoryReadArrow from "./Arrow";
import Text from "./Text";
import PersonsTable, {
  CLASS_PERSON_ROW,
  CLASS_PERSON_TABLE,
} from "./PersonsTable";

type Mode = "auto" | "manual" | "";
type Status = "idle" | "playing";

type ElementStatus = "hide" | "show" | "animate";

const personTrans: Transition = {
  type: "spring",
  damping: 15,
  stiffness: 150,
};

const arrowNoBounceTrans: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.5,
};

const arrowBounceTrans: Transition = {
  type: "spring",
  bounce: 0.5,
  duration: 1,
};

const labelTrans: Transition = {
  type: "spring",
  bounce: 0.4,
  duration: 0.75,
};

function nthPerson(n: number) {
  return `.person-row:nth-child(${n})`;
}

function indexArrow(status: ElementStatus) {
  const animationMap = {
    hide: { scale: 0 },
    animate: { scale: [0.9, 1] },
    show: { scale: 1 },
  };

  const transitionMap = {
    hide: arrowNoBounceTrans,
    animate: arrowBounceTrans,
    show: arrowNoBounceTrans,
  };

  return [
    [
      ".index-arrow",
      animationMap[status],
      { ...transitionMap[status], at: "<" },
    ],
    [
      ".read-label",
      animationMap[status],
      { ...transitionMap[status], at: "<" },
    ],
  ];
}

function personHighlighted(highlightIndex: number, result: boolean) {
  const numPersons = personData.length;
  return range(numPersons).map((personNum) => {
    const scale = personNum === highlightIndex ? 1.1 : 1;
    const backgroundColor =
      personNum === highlightIndex && result ? "#267326" : "#494554";
    return [
      nthPerson(personNum + 1),
      { scale, backgroundColor },
      { ...personTrans, at: "<" },
    ];
  });
}

function label(className: string, status: ElementStatus) {
  const animationMap: Record<ElementStatus, object> = {
    show: { opacity: 1, y: "0%" },
    animate: { opacity: 1, y: ["-100%", "0%"] },
    hide: { opacity: 0, y: "-100%" },
  };

  return [className, animationMap[status], { ...labelTrans, at: "<" }];
}

function memoryAddress(stepNum: number) {
  if (stepNum <= 3) return "0x001";
  else if (stepNum <= 6) return "0x002";
  else if (stepNum <= 9) return "0x003";
  else return "0x004";
}

function personAnimationSteps(
  tableOffset: string,
  personIndex: number,
  result: boolean
) {
  return [
    [
      [`.${CLASS_PERSON_TABLE}`, { y: tableOffset }, { ...personTrans }],
      ...personHighlighted(personIndex, false),
      ...indexArrow("animate"),
      label(".is-it-bob", "hide"),
      label(".result-no", "hide"),
      label(".result-yes", "hide"),
    ],
    [
      [`.${CLASS_PERSON_TABLE}`, { y: tableOffset }, { ...personTrans }],
      ...personHighlighted(personIndex, false),
      ...indexArrow("show"),
      label(".is-it-bob", "animate"),
      label(".result-no", "hide"),
      label(".result-yes", "hide"),
    ],
    [
      [`.${CLASS_PERSON_TABLE}`, { y: tableOffset }, { ...personTrans }],
      ...personHighlighted(personIndex, result),
      ...indexArrow("show"),
      label(".is-it-bob", "show"),
      label(".result-no", result ? "hide" : "animate"),
      label(".result-yes", result ? "animate" : "hide"),
    ],
  ];
}

function DatabaseIndexDemo() {
  const drawingBoardWidth = 800;
  const drawingBoardHeight = drawingBoardWidth / 1.618;

  const [scope, animate] = useAnimate();
  const [status, setStatus] = React.useState<Status>("idle");
  const [mode, setMode] = React.useState<Mode>("");
  const [currentStep, setCurrentStep] = React.useState(0);
  const [animationSteps, setAnimationSteps] = React.useState([]);

  React.useEffect(() => {
    const animationSteps = [
      [
        [`.${CLASS_PERSON_ROW}`, { y: "0%" }, { ...personTrans }],
        ...personHighlighted(-1, false),
        ...indexArrow("hide"),
        label(".is-it-bob", "hide"),
        label(".result-no", "hide"),
        label(".result-yes", "hide"),
      ],
      ...personAnimationSteps("35%", 0, false),
      ...personAnimationSteps("15%", 1, false),
      ...personAnimationSteps("-5%", 2, false),
      ...personAnimationSteps("-25%", 3, true),
    ];
    setAnimationSteps(animationSteps);
  }, [animate, scope]);

  function animateToStep(step: number) {
    if (step < 0 || step >= animationSteps.length) return;

    const nextStep = step;
    animate(animationSteps[nextStep]);
    setCurrentStep(nextStep);
  }

  return (
    <Wrapper
      style={{
        "--width": drawingBoardWidth + "px",
        "--height": drawingBoardHeight + "px",
      }}
    >
      <DrawingBoard ref={scope}>
        <DatabaseProcess className="database-process">
          Database Process
        </DatabaseProcess>
        <MemoryReadArrow />

        <ReadLabel
          initial={{
            scale: 0,
          }}
          className="read-label"
          style={{
            transformOrigin: "0% 50%",
          }}
        >{`Read row at ${memoryAddress(currentStep)}`}</ReadLabel>

        <Text left={20} top={264} className="is-it-bob">
          Is it Bob?
        </Text>
        <Text left={100} top={264} className="result-no">
          No ❌
        </Text>
        <Text left={100} top={264} className="result-yes">
          Yes ✅
        </Text>

        <PersonsTable />
      </DrawingBoard>
      <Spacer size={24} />
      <ControlPanel>
        {status === "idle" && (
          <>
            <StyledRadioGroup
              options={{
                manual: "Manual",
                auto: "Auto",
              }}
              value={mode}
              onChange={(value) => setMode(value)}
            />
            <Button
              variant="primary"
              size="regular"
              onClick={() => setStatus("playing")}
            >
              Start
            </Button>
          </>
        )}
        {mode === "manual" && status === "playing" && (
          <>
            <Button onClick={() => animateToStep(currentStep - 1)}>
              Previous
            </Button>
            <Button onClick={() => animateToStep(currentStep + 1)}>Next</Button>
            <Button
              variant="secondary"
              onClick={() => {
                animateToStep(0);
                setStatus("idle");
              }}
            >
              Cancel
            </Button>
          </>
        )}
      </ControlPanel>
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

const DatabaseProcess = styled(motion.div)`
  width: 160px;
  height: 54px;
  border: 2px solid var(--color-gray-500);
  display: grid;
  place-content: center;
  position: absolute;
  left: 20px;
  top: 208px;
`;

const ReadLabel = styled(motion.p)`
  position: absolute;
  font-size: 16px;
  left: 192px;
  top: 208px;
`;

const ControlPanel = styled.div`
  width: var(--width);
  margin-inline-start: auto;
  margin-inline-end: auto;
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;

export default DatabaseIndexDemo;
