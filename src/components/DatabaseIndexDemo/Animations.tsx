import styled from "styled-components";
import PersonsTable, {
  CLASS_PERSON_ROW,
  CLASS_PERSON_TABLE,
} from "./PersonsTable";
import Arrow, { ArrowType, CLASS_TABLE_ARROW, TYPE_MAP } from "./LabelledArrow";
import Text from "./Text";
import { motion } from "framer-motion";
import {
  arrowBounceTrans,
  arrowNoBounceTrans,
  labelTrans,
  personTrans,
} from "./transitions";
import { range } from "lodash-es";

import personData from "./data.json";

const CLASS_IS_IT_BOB = "is-it-bob";
const CLASS_RESULT_YES = "result-yes";
const CLASS_RESULT_NO = "result-no";
const CLASS_BOB_FOUND = "where-is-bob";

interface Props {
  currentStep: number;
}
type ElementStatus = "hide" | "show" | "animate";

function toSelector(className: string) {
  return `.${className}`;
}

function nthPerson(n: number) {
  return `${toSelector(CLASS_PERSON_ROW)}:nth-child(${n})`;
}

function arrow(status: ElementStatus, arrowType: ArrowType) {
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
      toSelector(TYPE_MAP[arrowType].className),
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

function personAnimationSteps(
  tableOffset: string,
  personIndex: number,
  result: boolean
) {
  return [
    [
      [toSelector(CLASS_PERSON_TABLE), { y: tableOffset }, { ...personTrans }],
      ...personHighlighted(personIndex, false),
      ...arrow("animate", "table_access"),
      label(toSelector(CLASS_IS_IT_BOB), "hide"),
      label(toSelector(CLASS_RESULT_NO), "hide"),
      label(toSelector(CLASS_RESULT_YES), "hide"),
    ],
    [
      [toSelector(CLASS_PERSON_TABLE), { y: tableOffset }, { ...personTrans }],
      ...personHighlighted(personIndex, false),
      ...arrow("show", "table_access"),
      label(toSelector(CLASS_IS_IT_BOB), "animate"),
      label(toSelector(CLASS_RESULT_NO), "hide"),
      label(toSelector(CLASS_RESULT_YES), "hide"),
    ],
    [
      [toSelector(CLASS_PERSON_TABLE), { y: tableOffset }, { ...personTrans }],
      ...personHighlighted(personIndex, result),
      ...arrow("show", "table_access"),
      label(toSelector(CLASS_IS_IT_BOB), "show"),
      label(toSelector(CLASS_RESULT_NO), result ? "hide" : "animate"),
      label(toSelector(CLASS_RESULT_YES), result ? "animate" : "hide"),
    ],
  ];
}

function memoryAddress(stepNum: number) {
  if (stepNum <= 3) return "0x001";
  else if (stepNum <= 6) return "0x002";
  else if (stepNum <= 9) return "0x003";
  else return "0x004";
}

export const withoutIndexAnimationSteps = [
  [
    [toSelector(CLASS_PERSON_TABLE), { y: "0%" }, { ...personTrans }],
    ...personHighlighted(-1, false),
    ...arrow("hide", "table_access"),
    label(toSelector(CLASS_IS_IT_BOB), "hide"),
    label(toSelector(CLASS_RESULT_NO), "hide"),
    label(toSelector(CLASS_RESULT_YES), "hide"),
  ],
  ...personAnimationSteps("35%", 0, false),
  ...personAnimationSteps("15%", 1, false),
  ...personAnimationSteps("-5%", 2, false),
  ...personAnimationSteps("-25%", 3, true),
];

export const withIndexAnimationSteps = [
  [
    [toSelector(CLASS_PERSON_TABLE), { y: "0%" }, { ...personTrans }],
    ...arrow("hide", "index_check"),
    ...arrow("hide", "index_return"),
    ...arrow("hide", "table_access"),
    ...personHighlighted(-1, false),
    label(toSelector(CLASS_BOB_FOUND), "hide"),
  ],
  [
    [toSelector(CLASS_PERSON_TABLE), { y: "0%" }, { ...personTrans }],
    ...arrow("animate", "index_check"),
    ...arrow("hide", "index_return"),
    ...arrow("hide", "table_access"),
    ...personHighlighted(-1, false),
    label(toSelector(CLASS_BOB_FOUND), "hide"),
  ],
  [
    [toSelector(CLASS_PERSON_TABLE), { y: "0%" }, { ...personTrans }],
    ...arrow("show", "index_check"),
    ...arrow("animate", "index_return"),
    ...arrow("hide", "table_access"),
    ...personHighlighted(-1, false),
    label(toSelector(CLASS_BOB_FOUND), "hide"),
  ],
  [
    [toSelector(CLASS_PERSON_TABLE), { y: "-25%" }, { ...personTrans }],
    ...arrow("show", "index_check"),
    ...arrow("show", "index_return"),
    ...arrow("animate", "table_access"),
    ...personHighlighted(3, false),
    label(toSelector(CLASS_BOB_FOUND), "hide"),
  ],
  [
    [toSelector(CLASS_PERSON_TABLE), { y: "-25%" }, { ...personTrans }],
    ...arrow("show", "index_check"),
    ...arrow("show", "index_return"),
    ...arrow("show", "table_access"),
    ...personHighlighted(3, true),
    label(toSelector(CLASS_BOB_FOUND), "animate"),
  ],
];
export function WithoutIndexAnimation({ currentStep }: Props) {
  return (
    <Wrapper>
      <DatabaseProcess className="database-process">
        Database Process
      </DatabaseProcess>
      <Arrow
        arrowType="table_access"
        label={`Read row at ${memoryAddress(currentStep)}`}
      />

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

      <Caption>
        Visualization of how the DB looks at every row to find a record when there is no index,{" "}
        <strong>Bob&nbsp;Brown</strong>, in this example.
      </Caption>
    </Wrapper>
  );
}

export function WithIndexAnimation({ currentStep }: Props) {
  return (
    <Wrapper>
      <DatabaseProcess className="database-process">
        Database Process
      </DatabaseProcess>
      <Index>Index</Index>

      <Arrow
        arrowType="index_check"
        label={
          <>
            Where <br /> is Bob?
          </>
        }
      />
      <Arrow arrowType="index_return" label={"At 0x004"} />
      <Arrow arrowType="table_access" label={`Read row at 0x004`} />
      <Text left={20} top={264} className={CLASS_BOB_FOUND}>
        Bob found! ✅
      </Text>
      <PersonsTable />
      <Caption>
        Visualization of how the DB utilizes an index to quickly the find a
        record, <strong>Bob Brown</strong>, in this example.
      </Caption>
    </Wrapper>
  );
}

const Wrapper = styled.figure`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-direction: column-reverse;
  align-items: center;
`;

const Caption = styled.figcaption`
  padding-bottom: 16px;
  max-width: 520px;
  text-align: center;
  font-weight: 300;
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

const Index = styled(motion.div)`
  width: 100px;
  height: 54px;
  border: 2px solid var(--color-gray-500);
  display: grid;
  place-content: center;
  position: absolute;
  left: 50px;
  top: 24px;
`;
