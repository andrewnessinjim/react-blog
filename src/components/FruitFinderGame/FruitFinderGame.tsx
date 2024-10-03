"use client";

import * as React from 'react';
import styled from "styled-components";
import _ from "lodash-es";

function FruitFinderGame() {
  return (
    <Wrapper>
      {_.range(12).map(num => <CrateCard key={num} />)}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  gap: 8px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  max-width: calc((160px + 8px) * 4);
  margin-left: auto;
  margin-right: auto;
`;

function CrateCard() {
  return (
    <CrateCardWrapper>
      {_.range(5).map(num => <HorizontalPlank style={{
        gridRow: num + 1
      }} key={num} />)}

      <VerticalPlank style={{
        gridColumn: 1
      }} />
      <VerticalPlank style={{
        gridColumn: -2
      }} />
    </CrateCardWrapper>
  );
}

const CrateCardWrapper = styled.div`
  aspect-ratio: 1/1;
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(8, 1fr);
`;

const HorizontalPlank = styled.div`
  background-color: #8F4A0B;
  border: 2px solid #31180d;
  grid-column: -1/1;
`;

const VerticalPlank = styled.div`
  background-color: #592A13;
  border: 2px solid #31180d;
  grid-row: -1/1;
`



export default FruitFinderGame;