"use client";

import * as React from "react";
import styled from "styled-components";
import DemoUnitCard from "../DemoUnitCard";
import * as _ from "lodash-es";

const VIEW_BOX_WIDTH = 482;
const VIEW_BOX_HEIGHT = 482;

const BLOCK_SIZE = 48;
const BLOCKS_BEGIN_X_OFFSET = 1 + BLOCK_SIZE * 2;
const BLOCKS_BEGIN_Y_OFFSET = 1 + BLOCK_SIZE * 2;

const ROWS = 6;
const COLUMNS = 6;

function StorageMatrix({caption}:Props) {
  return (
    <DemoUnitCard caption={caption}>
      <Wrapper>
        <svg
          id="svg"
          width={VIEW_BOX_WIDTH}
          height={VIEW_BOX_HEIGHT}
          viewBox={`0 0 ${VIEW_BOX_WIDTH} ${VIEW_BOX_HEIGHT}`}
        >
          {/* <SolidBlocks /> */}
          <ImaginaryVerticalLines />
          <ImaginaryHorizontalLines />
        </svg>
      </Wrapper>
    </DemoUnitCard>
  );
}

function SolidBlocks() {
  return _.range(ROWS).map((rowNum) => {
    return _.range(COLUMNS).map((colNum) => {
      const x = colNum * BLOCK_SIZE + BLOCKS_BEGIN_X_OFFSET;
      const y = rowNum * BLOCK_SIZE + BLOCKS_BEGIN_Y_OFFSET;
      return <Block x={x} y={y} key={`${rowNum}-${colNum}`} />;
    });
  });
}

function ImaginaryVerticalLines() {
  return _.range(-1, COLUMNS + 2).map((colNum) => {
    const x = colNum * BLOCK_SIZE + BLOCKS_BEGIN_X_OFFSET;
    const y1 = BLOCKS_BEGIN_Y_OFFSET - BLOCK_SIZE * 2;
    const y2 = BLOCKS_BEGIN_Y_OFFSET + BLOCK_SIZE * ROWS + BLOCK_SIZE * 2;
    return (
      <line
        key={colNum}
        x1={x}
        y1={y1}
        x2={x}
        y2={y2}
        stroke="var(--color-primary)"
        strokeWidth={2}
        strokeDasharray="4 4"
      />
    );
  });
}

function ImaginaryHorizontalLines() {
  return _.range(-1, ROWS + 2).map((rowNum) => {
    const x1 = BLOCKS_BEGIN_X_OFFSET - BLOCK_SIZE * 2;
    const y = rowNum * BLOCK_SIZE + BLOCKS_BEGIN_Y_OFFSET;
    const x2 = BLOCKS_BEGIN_X_OFFSET + BLOCK_SIZE * COLUMNS + BLOCK_SIZE * 2;
    return (
      <line
        key={rowNum}
        x1={x1}
        y1={y}
        x2={x2}
        y2={y}
        stroke="var(--color-primary)"
        strokeWidth={2}
        strokeDasharray="4 4"
      />
    );
  });
}

function Block({ ...delegated }) {
  return (
    <rect
      stroke="var(--color-primary)"
      width={BLOCK_SIZE}
      height={BLOCK_SIZE}
      strokeWidth={2}
      fill="none"
      {...delegated}
    />
  );
}

const Wrapper = styled.div`
  display: grid;
  place-content: center;
`;

interface Props {
  caption: React.ReactNode
}

export default StorageMatrix;
