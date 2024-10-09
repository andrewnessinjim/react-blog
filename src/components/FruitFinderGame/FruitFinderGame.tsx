"use client";

import * as React from "react";
import styled from "styled-components";
import _ from "lodash-es";
import Crate from "./Crate";

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

function FruitFinderGame() {
  const [fruits, setFruits] = React.useState(_.fill(Array(12), ""));

  React.useEffect(() => {
    setFruits(_.shuffle(FRUITS));
  }, []);

  return (
    <Wrapper>
      {fruits.map((fruit, index) => (
        <Crate key={index} sticker={fruit} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 520px;
  gap: 64px 32px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  /* max-width: calc((160px + 8px) * 4); */
  margin-left: auto;
  margin-right: auto;
  perspective: 1200px;
  justify-content: center;
  padding: 32px 0 0 0;
`;

export default FruitFinderGame;
