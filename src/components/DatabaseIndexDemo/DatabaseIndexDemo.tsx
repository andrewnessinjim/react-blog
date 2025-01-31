"use client";

import * as React from "react";
import styled from "styled-components";

import personData from "./data.json";
import { Transition, useAnimate, motion } from "framer-motion";
import PersonRow from "./PersonRow";
import StyledRadioGroup from "../StyledRadioGroup";
import Spacer from "../Spacer";
import Button from "../Button";
import { range } from "lodash-es";
import MemoryReadArrow from "./Arrow";

type Mode = "auto" | "manual" | "";
type Status = "idle" | "playing";
const personTrans: Transition = {
  type: "spring",
  damping: 15,
  stiffness: 150,
};

const arrowTransWithoutBounce: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.5,
};

const arrowTransBounce: Transition = {
  type: "spring",
  bounce: 0.5,
  duration: 1,
};

const compareLabelTrans: Transition = {
  type: "spring",
  bounce: 0.15,
  duration: 0.25,
};

function nthPerson(n: number) {
  return `.person-row:nth-child(${n})`;
}

function indexArrow(status: "hide" | "show" | "animate") {
  const animationMap = {
    hide: { scale: 0 },
    animate: { scale: [0.9, 1] },
    show: { scale: 1 },
  };

  const transitionMap = {
    hide: arrowTransWithoutBounce,
    animate: arrowTransBounce,
    show: arrowTransWithoutBounce,
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

function label(className: string, show: boolean) {
  const animation = show ? { opacity: 1, y: "0%" } : { opacity: 0, y: "-100%" };
  return [className, animation, { ...compareLabelTrans, at: "<" }];
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
      [".person-table", { y: tableOffset }, { ...personTrans }],
      ...personHighlighted(personIndex, false),
      ...indexArrow("animate"),
      label(".is-it-bob", false),
      label(".result-no", false),
      label(".result-yes", false),
    ],
    [
      [".person-table", { y: tableOffset }, { ...personTrans }],
      ...personHighlighted(personIndex, false),
      ...indexArrow("show"),
      label(".is-it-bob", true),
      label(".result-no", false),
      label(".result-yes", false),
    ],
    [
      [".person-table", { y: tableOffset }, { ...personTrans }],
      ...personHighlighted(personIndex, result),
      ...indexArrow("show"),
      label(".is-it-bob", true),
      label(".result-no", result ? false : true),
      label(".result-yes", result ? true : false),
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
        [".person-table", { y: "0%" }, { ...personTrans }],
        ...personHighlighted(-1, false),
        ...indexArrow("hide"),
        label(".is-it-bob", false),
        label(".result-no", false),
        label(".result-yes", false),
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

        <IsItBob
          initial={{
            opacity: 0,
            y: "-100%",
          }}
          className="is-it-bob"
        >
          Is it Bob?
        </IsItBob>
        <ResultNo
          initial={{
            opacity: 0,
            y: "-100%",
          }}
          className="result-no"
        >
          No ❌
        </ResultNo>
        <ResultYes
          initial={{
            opacity: 0,
            y: "-100%",
          }}
          className="result-yes"
        >
          Yes ✅
        </ResultYes>

        <PersonsTableContainer className="person-table">
          {personData.map((person) => {
            return (
              <PersonRow
                key={person.id}
                person={person}
                className="person-row"
              />
            );
          })}
        </PersonsTableContainer>
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

const IsItBob = styled(motion.p)`
  position: absolute;
  font-size: 16px;
  left: 20px;
  top: 264px;
`;

const ResultYes = styled(motion.p)`
  position: absolute;
  font-size: 16px;
  left: 100px;
  top: 264px;
`;

const ResultNo = styled(motion.p)`
  position: absolute;
  font-size: 16px;
  left: 100px;
  top: 264px;
`;

const PersonsTableContainer = styled(motion.div)`
  position: absolute;
  right: 48px;
  top: 145px;
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
