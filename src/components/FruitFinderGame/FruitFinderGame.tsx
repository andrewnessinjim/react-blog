"use client";

import * as React from "react";

import ResetController from "./ResetController";

export const FruitToFindContext = React.createContext({
  fruitToFind: "",
  showIndex: false,
});

function FruitFinderGame({ fruitToFind, showIndex = false }: Props) {
  return (
    <FruitToFindContext.Provider value={{ fruitToFind, showIndex }}>
      <ResetController />
    </FruitToFindContext.Provider>
  );
}

interface Props {
  fruitToFind: string;
  showIndex: false;
}

export default FruitFinderGame;
