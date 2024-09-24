import React from "react";
import { OBSERVED_ELEM_HEIGHT, VIEWPORT_BOTTOM_Y } from "./constants";
import { INITIAL_Y_POSITIONS, YPositions } from "./YPositionScroller";

export default function useDidEnterOrExitViewport() {
  const [yPositions, setYPositions] =
    React.useState<YPositions>(INITIAL_Y_POSITIONS);
  const [threshold, setThreshold] = React.useState(0);
  const [rootMargin, setRootMargin] = React.useState(0);

  const [didEnterViewport, setDidEnterViewport] = React.useState(false);
  const [didExitViewport, setDidExitViewport] = React.useState(false);

  function hasExitedViewport(
    prevObservedElemY: number,
    nextObservedElemY: number
  ) {
    return (
      VIEWPORT_BOTTOM_Y + rootMargin >
        prevObservedElemY + OBSERVED_ELEM_HEIGHT * threshold &&
      VIEWPORT_BOTTOM_Y + rootMargin <
        nextObservedElemY + OBSERVED_ELEM_HEIGHT * threshold
    );
  }

  function hasEnteredViewPort(
    prevObservedElemY: number,
    nextObservedElemY: number
  ) {
    const result =
      VIEWPORT_BOTTOM_Y + rootMargin <
        prevObservedElemY + OBSERVED_ELEM_HEIGHT * threshold &&
      VIEWPORT_BOTTOM_Y + rootMargin >
        nextObservedElemY + OBSERVED_ELEM_HEIGHT * threshold;

    return result;
  }

  function updateYPositions(nextYPositions: YPositions) {
    setYPositions((prevYPositions) => {
      setDidEnterViewport(
        hasEnteredViewPort(
          prevYPositions.observedElemY,
          nextYPositions.observedElemY
        )
      );

      setDidExitViewport(
        hasExitedViewport(
          prevYPositions.observedElemY,
          nextYPositions.observedElemY
        )
      );
      return nextYPositions;
    });
  }

  return {
    yPositions,
    didEnterViewport,
    didExitViewport,
    updateYPositions,
    threshold,
    setThreshold,
    rootMargin,
    setRootMargin,
  };
}
