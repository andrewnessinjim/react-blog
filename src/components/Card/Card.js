import React from 'react';

import { Wrapper } from './Card.styled';

function Card({ children, ...delegated }) {
  return (
    <Wrapper {...delegated}>
      {children}
    </Wrapper>
  );
}

export default Card;
