"use client";

import * as React from "react";
import styled from "styled-components";
import Spacer from "../Spacer";

function InlineVideo({ src }: Props) {
  return (
    <>
      <Wrapper>
        <video src={src} autoPlay loop={true} muted width={320} controls />
      </Wrapper>
      <Spacer size={32} />
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

interface Props {
  src: string;
}

export default InlineVideo;
