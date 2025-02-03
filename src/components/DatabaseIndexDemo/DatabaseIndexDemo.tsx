"use client";

import * as React from "react";
import styled from "styled-components";

import personData from "./data.json";
import { Transition, useAnimate, motion } from "framer-motion";
import Spacer from "../Spacer";

import { range } from "lodash-es";
import TableAccessArrow, { CLASS_TABLE_ARROW } from "./Arrow";
import Text from "./Text";
import PersonsTable, {
  CLASS_PERSON_ROW,
  CLASS_PERSON_TABLE,
} from "./PersonsTable";
import ControlPanel, { Mode } from "./ControlPanel";

type ElementStatus = "hide" | "show" | "animate";

const CLASS_IS_IT_BOB = "is-it-bob";
const CLASS_RESULT_YES = "result-yes";
const CLASS_RESULT_NO = "result-no";

function toSelector(className: string) {
  return `.${className}`;
}

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
  return `${toSelector(CLASS_PERSON_ROW)}:nth-child(${n})`;
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
      toSelector(CLASS_TABLE_ARROW),
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
      [toSelector(CLASS_PERSON_TABLE), { y: tableOffset }, { ...personTrans }],
      ...personHighlighted(personIndex, false),
      ...indexArrow("animate"),
      label(toSelector(CLASS_IS_IT_BOB), "hide"),
      label(toSelector(CLASS_RESULT_NO), "hide"),
      label(toSelector(CLASS_RESULT_YES), "hide"),
    ],
    [
      [toSelector(CLASS_PERSON_TABLE), { y: tableOffset }, { ...personTrans }],
      ...personHighlighted(personIndex, false),
      ...indexArrow("show"),
      label(toSelector(CLASS_IS_IT_BOB), "animate"),
      label(toSelector(CLASS_RESULT_NO), "hide"),
      label(toSelector(CLASS_RESULT_YES), "hide"),
    ],
    [
      [toSelector(CLASS_PERSON_TABLE), { y: tableOffset }, { ...personTrans }],
      ...personHighlighted(personIndex, result),
      ...indexArrow("show"),
      label(toSelector(CLASS_IS_IT_BOB), "show"),
      label(toSelector(CLASS_RESULT_NO), result ? "hide" : "animate"),
      label(toSelector(CLASS_RESULT_YES), result ? "animate" : "hide"),
    ],
  ];
}

function DatabaseIndexDemo() {
  const drawingBoardWidth = 800;
  const drawingBoardHeight = drawingBoardWidth / 1.618;

  const [scope, animate] = useAnimate();
  const [currentStep, setCurrentStep] = React.useState(0);

  function getAnimationSteps(mode: Mode) {
    return [
      [
        [toSelector(CLASS_PERSON_TABLE), { y: "0%" }, { ...personTrans }],
        ...personHighlighted(-1, false),
        ...indexArrow("hide"),
        label(toSelector(CLASS_IS_IT_BOB), "hide"),
        label(toSelector(CLASS_RESULT_NO), "hide"),
        label(toSelector(CLASS_RESULT_YES), "hide"),
      ],
      ...personAnimationSteps("35%", 0, false),
      ...personAnimationSteps("15%", 1, false),
      ...personAnimationSteps("-5%", 2, false),
      ...personAnimationSteps("-25%", 3, true),
    ];
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
        <TableAccessArrow />

        <ReadLabel
          initial={{
            scale: 0,
          }}
          className="read-label"
          style={{
            transformOrigin: "0% 50%",
          }}
        >{`Read row at ${memoryAddress(currentStep)}`}</ReadLabel>

        <Text left={20} top={264} className={CLASS_IS_IT_BOB}>
          Is it Bob?
        </Text>
        <Text left={100} top={264} className={CLASS_RESULT_NO}>
          No ❌
        </Text>
        <Text left={100} top={264} className={CLASS_RESULT_YES}>
          Yes ✅
        </Text>

        <PersonsTable />
      </DrawingBoard>
      <Spacer size={24} />
      <ControlPanel
        animate={animate}
        getAnimationSteps={getAnimationSteps}
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

export default DatabaseIndexDemo;
