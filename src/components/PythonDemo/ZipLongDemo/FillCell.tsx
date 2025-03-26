import React from "react";
import Cell from "../Cell";
import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import { ItemWithPosition } from "../hooks/useZipLongIterables";

interface Props {
  value: string;
  setValue: (value: string) => void;
  fillItemWithPositions: ItemWithPosition[];
  isFilling: boolean;
}

function FillCell({
  value,
  setValue,
  fillItemWithPositions,
  isFilling,
}: Props) {
  const id = React.useId();

  const enableMotionAlternative = useReducedMotion() ?? false;

  return (
    <Wrapper>
      Fill Value:
      <CellWrapper
        key={Math.random()}
        animate={{
          scale: isFilling ? [0.95, 1.05, 1] : 1,
          boxShadow:
            isFilling && enableMotionAlternative
              ? "0 0 0 4px green"
              : "0 0 0 0px black",
        }}
      >
        <Cell editable value={value} onChange={(value) => setValue(value)} />
        {fillItemWithPositions.map((itemWithPosition) => {
          const { item } = itemWithPosition;
          return (
            <OverlayItemWrapper
              key={item.id}
              layoutId={item.id}
              data-layoutid={item.id}
            >
              <Cell editable={false} key={item.id} value={item.value} />
            </OverlayItemWrapper>
          );
        })}
      </CellWrapper>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const CellWrapper = styled(motion.div)`
  position: relative;
`;

const OverlayItemWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
`;

export default FillCell;
