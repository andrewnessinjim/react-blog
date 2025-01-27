"use client";

import * as React from "react";
import styled from "styled-components";
import * as _ from "lodash-es";
import Crate from "./Crate";
import { motion } from "framer-motion";
import { FruitToFindContext } from "./FruitFinderGame";
import IndexTable from "./IndexTable";

const FRUITS = [
  "🥝",
  "🍇",
  "🍈",
  "🍉",
  "🍊",
  "🍋",
  "🍌",
  "🍍",
  "🥭",
  "🍎",
  "🍓",
  "🍒",
];

function GameBoard({ onReset }: Props) {
  const [fruits, setFruits] = React.useState<string[]>(_.fill(Array(12), ""));
  const [answerIndex, setAnswerIndex] = React.useState(-1);
  const [isFound, setIsFound] = React.useState(false);
  const cratesWrapperRef = React.useRef<HTMLDivElement>(null);
  const [numCratesColumns, setNumCratesColumns] = React.useState(4);

  console.log({ answerIndex });

  const { fruitToFind, showIndex } = React.useContext(FruitToFindContext);

  React.useEffect(() => {
    const shuffledFruits: string[] = _.shuffle(FRUITS);
    setFruits(shuffledFruits);
    setAnswerIndex(shuffledFruits.findIndex((fruit) => fruit === fruitToFind));
  }, [fruitToFind]);

  React.useEffect(() => {
    if (cratesWrapperRef.current) {
      const cratesGridStyles = window.getComputedStyle(cratesWrapperRef.current);
      const cratesGridTemplateColumns = cratesGridStyles.getPropertyValue(
        "grid-template-columns"
      );
      const columnCount = cratesGridTemplateColumns.split(" ").length;

      setNumCratesColumns(columnCount);
    }
  }, []);

  return (
    <Wrapper>
      <Instruction>Find the crate with {fruitToFind}</Instruction>
      {showIndex && <IndexTable fruits={fruits} numCols={numCratesColumns} />}
      <CratesWrapper ref={cratesWrapperRef}>
        {fruits.map((fruit, index) => (
          <Crate
            key={index}
            sticker={fruit}
            onClick={() => setIsFound(index === answerIndex)}
            disabled={isFound}
          />
        ))}
        {isFound && (
          <FoundBanner
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              type: "spring",
              delay: 0.2,
            }}
          >
            <WinMessage>You found the {fruitToFind}!</WinMessage>
            <button onClick={onReset}>Retry</button>
          </FoundBanner>
        )}
      </CratesWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const Instruction = styled.p`
  text-align: center;
`;

const CratesWrapper = styled.div`
  width: 100%;
  max-width: 520px;
  gap: 64px 32px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  margin-left: auto;
  margin-right: auto;
  perspective: 1200px;
  justify-content: center;
  padding: 32px 0;
  position: relative;
`;

const FoundBanner = styled(motion.div)`
  position: absolute;
  inset: 32px;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  background-color: hsl(0deg 0% 0% / 0.8);
  color: white;
  display: grid;
  place-content: center;
  font-size: 2rem;
  text-align: center;
`;

const WinMessage = styled.p`
  font-size: 2rem;
`;

interface Props {
  onReset: () => void;
}

export default GameBoard;
