"use client";

import * as React from "react";
import styled from "styled-components";
import DemoUnitCard from "../DemoUnitCard";
import _ from "lodash-es";

const VIEW_BOX_WIDTH = 482;
const VIEW_BOX_HEIGHT = 482;

const BLOCK_SIZE = 48;
const BLOCKS_BEGIN_X_OFFSET = 1 + BLOCK_SIZE * 2;
const BLOCKS_BEGIN_Y_OFFSET = 1 + BLOCK_SIZE * 2;

const ROWS = 6;
const COLUMNS = 6;

function StorageMatrix() {
  return (
    <DemoUnitCard>
      <Wrapper>
        <svg
          id="svg"
          width={VIEW_BOX_WIDTH}
          height={VIEW_BOX_HEIGHT}
          viewBox={`0 0 ${VIEW_BOX_WIDTH} ${VIEW_BOX_HEIGHT}`}
        >
          <defs>
            <linearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="red" />
              <stop offset="100%" stopColor="blue" />
            </linearGradient>
          </defs>

          {/* <line x1="10" y1="100" x2="190" y2="100" stroke="green" stroke-width="5" /> */}
          <path d="M 10 10 H 90 V 90 H 10 L 10 10" fill="none" strokeWidth={3} stroke="url(#myGradient)" strokeDasharray={"8 8"} />

          {_.range(ROWS).map(rowNum => {
            return _.range(COLUMNS).map(colNum => {
              const x = colNum * BLOCK_SIZE + BLOCKS_BEGIN_X_OFFSET;
              const y = rowNum * BLOCK_SIZE + BLOCKS_BEGIN_Y_OFFSET;
              return (
                <Block
                  x={x}
                  y={y}
                  key={`${rowNum}-${colNum}`} />
              )
            })
          })}
          {_.range(-2, COLUMNS + 3).map(colNum => {
            const x = colNum * BLOCK_SIZE + BLOCKS_BEGIN_X_OFFSET;
            const y1 = BLOCKS_BEGIN_Y_OFFSET - BLOCK_SIZE * 2;
            const y2 = BLOCKS_BEGIN_Y_OFFSET + (BLOCK_SIZE * ROWS) + BLOCK_SIZE * 2;
            return <line
              key={colNum}
              x1={x}
              y1={y1}
              x2={x}
              y2={y2}
              opacity={0.25}
              stroke="var(--color-primary)"
              strokeWidth={2}
              strokeDasharray="8 8" />
          })}

          {_.range(-2, ROWS + 3).map(rowNum => {
            const x1 = BLOCKS_BEGIN_X_OFFSET - BLOCK_SIZE * 2;
            const y = rowNum * BLOCK_SIZE + BLOCKS_BEGIN_Y_OFFSET;
            const x2 = BLOCKS_BEGIN_X_OFFSET + (BLOCK_SIZE * COLUMNS) + BLOCK_SIZE * 2;
            return <line
              key={rowNum}
              x1={x1}
              y1={y}
              x2={x2}
              y2={y}
              opacity={0.25}
              stroke="var(--color-primary)"
              strokeWidth={2}
              strokeDasharray="8 8" />
          })}
        </svg>
      </Wrapper>
    </DemoUnitCard>
  );
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
  margin-left: auto;
  margin-right: auto;
`;

export default StorageMatrix;
