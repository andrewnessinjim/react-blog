"use client";

import * as React from "react";
import styled from "styled-components";
import * as _ from "lodash-es";
import Crate from "./Crate";
import { motion } from "framer-motion";
import { FruitToFindContext } from "./FruitFinderGame";

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

  console.log({ answerIndex });

  const fruitToFind = React.useContext(FruitToFindContext);

  React.useEffect(() => {
    const shuffledFruits:string[] = _.shuffle(FRUITS);
    setFruits(shuffledFruits);
    setAnswerIndex(shuffledFruits.findIndex((fruit) => fruit === fruitToFind));
  }, [fruitToFind]);

  return (
    <Wrapper>
      <CratesWrapper>
        {fruits.map((fruit, index) => (
          <Crate
            key={index}
            sticker={fruit}
            onClick={() => setIsFound(index === answerIndex)}
            disabled={isFound}
          />
        ))}
      </CratesWrapper>
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
            delay: 1,
          }}
        >
          <WinMessage>You found the {fruitToFind}!</WinMessage>
          <button onClick={onReset}>Retry</button>
        </FoundBanner>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
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
