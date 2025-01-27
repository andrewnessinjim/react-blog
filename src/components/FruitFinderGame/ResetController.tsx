import React from "react";
import GameBoard from "./GameBoard";

function ResetController() {
  const [resetKey, setResetKey] = React.useState(crypto.randomUUID());

  function onReset() {
    setResetKey(crypto.randomUUID());
  }
  return <GameBoard key={resetKey} onReset={onReset} />;
}

export default ResetController;
