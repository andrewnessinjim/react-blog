"use client";

import * as React from "react";

import _ from "lodash-es";

import ResetController from "./ResetController";

export const FruitToFindContext = React.createContext("");

function FruitFinderGame({ fruitToFind }: Props) {
  return (
    <FruitToFindContext.Provider value={fruitToFind}>
      <ResetController />
    </FruitToFindContext.Provider>
  );
}

interface Props {
  fruitToFind: string;
}

export default FruitFinderGame;
