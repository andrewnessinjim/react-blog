import React from "react";
import {
  VIEWPORT_BOTTOM_Y,
} from "./constants";
import { INITIAL_Y_POSITIONS, YPositions } from "./YPositionScroller";

export default function useDidEnterOrExitViewport() {
  const [yPositions, setYPositions] = React.useState<YPositions>(
    INITIAL_Y_POSITIONS
  );
  const [didEnterOrExitViewport, setDidEnterOrExitViewport] =
    React.useState(false);

  function hasExitedViewport(
    prevObservedElemY: number,
    nextObservedElemY: number
  ) {
    return (
      VIEWPORT_BOTTOM_Y > prevObservedElemY &&
      VIEWPORT_BOTTOM_Y < nextObservedElemY
    );
  }

  function hasEnteredViewPort(
    prevObservedElemY: number,
    nextObservedElemY: number
  ) {
    return (
      VIEWPORT_BOTTOM_Y < prevObservedElemY &&
      VIEWPORT_BOTTOM_Y > nextObservedElemY
    );
  }

  function hasEnteredOrExitedViewPort(
    prevObservedElemY: number,
    nextObservedElemY: number
  ) {
    return (
      hasEnteredViewPort(prevObservedElemY, nextObservedElemY) ||
      hasExitedViewport(prevObservedElemY, nextObservedElemY)
    );
  }

  function updateYPositions(nextYPositions: YPositions) {
    setYPositions((prevYPositions) => {
      setDidEnterOrExitViewport(
        hasEnteredOrExitedViewPort(
          prevYPositions.observedElemY,
          nextYPositions.observedElemY
        )
      );

      return nextYPositions;
    });
  }

  return {
    yPositions,
    didEnterOrExitViewport,
    updateYPositions,
  };
}
