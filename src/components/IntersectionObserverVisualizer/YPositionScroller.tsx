import React, { ComponentProps } from "react";
import { MAX_SCROLLBAR_VAL, yPositionsFromScrollPos } from "./helpers";
import Scrollbar from "./Scrollbar";

function YPositionScroller({
  onYPositionChange,
  defaultScrollPosition,
  ...delegated
}: Props) {
  const [scrollPosition, setScrollPosition] = React.useState(
    defaultScrollPosition
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
  defaultScrollPosition: number;
};

export interface YPositions {
  pageY: number;
  observedElemY: number;
}

export default YPositionScroller;
