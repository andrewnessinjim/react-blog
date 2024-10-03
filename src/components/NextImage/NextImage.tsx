"use client";

import { MEDIA_QUERIES } from '@/constants';
import Image from 'next/image';
import * as React from 'react';
import styled from "styled-components";



function NextImage({ height, phoneHeight, ...delegated }: Props) {
  return (
    <Wrapper style={{
      "--height": height + "px",
      "--phone-height": phoneHeight + "px"
    } as React.CSSProperties}>
      <StImage {...delegated} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  height: var(--height);
  container-type: inline-size;
  
  @media ${MEDIA_QUERIES.phoneAndBelow} {
    height: var(--phone-height);
  }
`;

const StImage = styled(Image)`
  object-fit: contain;
`
type Props = React.ComponentProps<typeof Image> & {
  phoneHeight: number;
};

export default NextImage;