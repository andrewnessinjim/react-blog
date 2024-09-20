import React, { ComponentProps } from "react";
import {
  INIT_PAGE_Y,
  MAX_SCROLLBAR_VAL,
  OBSERVED_ELEM_OFFSET_FROM_BOTTOM,
  PAGE_HEIGHT,
  VIEWPORT_HEIGHT,
} from "./constants";
import Scrollbar from "./Scrollbar";

const INITIAL_SCROLL_POSITION = 0;
export const INITIAL_Y_POSITIONS = yPositionsFromScrollPos(
  INITIAL_SCROLL_POSITION
);

function YPositionScroller({ onYPositionChange, ...delegated }: Props) {
  const [scrollPosition, setScrollPosition] = React.useState(
    INITIAL_SCROLL_POSITION
  );

  return (
    <Scrollbar
      orientation="vertical"
      inverted
      value={[scrollPosition]}
      step={10}
      max={MAX_SCROLLBAR_VAL}
      {...delegated}
      onValueChange={([nextScrollPosition]) => {
        setScrollPosition(nextScrollPosition);
        const nextYPositions = yPositionsFromScrollPos(nextScrollPosition);

        onYPositionChange(nextYPositions);
      }}
    />
  );
}

type Props = ComponentProps<typeof Scrollbar> & {
  onYPositionChange: (yPositions: YPositions) => void;
};

function yPositionsFromScrollPos(scrollPos: number): YPositions {
  const pageY = pageYFromScrollPos(scrollPos);
  return {
    pageY,
    observedElemY: observedElemYFromPageY(pageY),
  };
}

function pageYFromScrollPos(scrollPos: number) {
  return (
    INIT_PAGE_Y -
    (scrollPos / MAX_SCROLLBAR_VAL) * (PAGE_HEIGHT - VIEWPORT_HEIGHT + 8)
  );
}

function observedElemYFromPageY(pageY: number) {
  return pageY + PAGE_HEIGHT + OBSERVED_ELEM_OFFSET_FROM_BOTTOM;
}

export interface YPositions {
  pageY: number;
  observedElemY: number;
}

export default YPositionScroller;
