import React from "react";
import Cell from "../Cell";
import styled from "styled-components";
import { motion } from "framer-motion";
import { IterableItemObject } from "../types";
import { ItemWithPosition } from "../hooks/useZipLongIterables";

interface Props {
  value: string;
  setValue: (value: string) => void;
  fillItemWithPositions: ItemWithPosition[];
}

function FillCell({ value, setValue, fillItemWithPositions }: Props) {
  const id = React.useId();
  return (
    <Wrapper>
      Fill Value:
      <CellWrapper>
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

const CellWrapper = styled.div`
  position: relative;
`;

const OverlayItemWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
`;

export default FillCell;
