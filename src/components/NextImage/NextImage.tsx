"use client";

import { MEDIA_QUERIES } from "@/constants";
import Image from "next/image";
import * as React from "react";
import styled from "styled-components";
import Spacer from "../Spacer";

function NextImage({ height, phoneHeight, caption = "", ...delegated }: Props) {
  return (
    <Wrapper>
      <ImageWrapper
        style={
          {
            "--height": height + "px",
            "--phone-height": phoneHeight + "px",
          } as React.CSSProperties
        }
      >
        <StImage {...delegated} />
      </ImageWrapper>
      {caption !== "" && (
        <>
          <Spacer size={8}/>
          <Caption>{caption}</Caption>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.figure``;

const ImageWrapper = styled.div`
  position: relative;
  height: var(--height);
  container-type: inline-size;

  @media ${MEDIA_QUERIES.phoneAndBelow} {
    height: var(--phone-height);
  }
`;

const StImage = styled(Image)`
  object-fit: contain;
`;

const Caption = styled.figcaption`
  text-align: center;
  max-width: 60%;
  margin-left: auto;
  margin-right: auto;
`;

type Props = React.ComponentProps<typeof Image> & {
  phoneHeight: number;
  caption: string;
};

export default NextImage;
