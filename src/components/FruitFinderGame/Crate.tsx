import _ from "lodash-es";
import styled, { keyframes } from "styled-components";
import CrateFace from "./CrateFace";
import React from "react";

function Crate({ sticker }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Wrapper onClick={() => setIsOpen(true)} $isOpen={isOpen}>
      <FrontFace />
      <TopFaceWrapper>
        <TopFace />
      </TopFaceWrapper>
      <BackFace sticker={isOpen ? sticker : ""} />
      <LeftFace />
      <RightFace />
      <BottomFace />
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $isOpen: boolean }>`
  position: relative;
  width: 100px;
  height: 100px;
  transform-style: preserve-3d;
  transition: 250ms transform;
  cursor: pointer;
  transform: rotateX(${(p) => (p.$isOpen ? "-45deg" : "0deg")});
  --top-face-rotation: ${(p) => (p.$isOpen ? "45deg" : "0deg")};

  &:hover {
    transform: rotateX(-45deg);
  }
`;

const TopFaceWrapper = styled.div`
  width: 100%;
  height: 100%;
  transform-style: inherit;
  position: absolute;
  transform: rotateX(90deg) translateZ(50px);
`;

const FrontFace = styled(CrateFace)`
  transform: translateZ(50px);
`;

const BackFace = styled(CrateFace)`
  transform: translateZ(-48px) rotateY(180deg);
`;

const TopFace = styled(CrateFace)`
  transform: rotateX(var(--top-face-rotation));
  transform-origin: top;
  transition: 250ms transform;
`;

const BottomFace = styled(CrateFace)`
  transform: rotateX(-90deg) translateZ(48px);
  --face-back-color: #8f4a0b;
`;

const LeftFace = styled(CrateFace)`
  transform: rotateY(-90deg) translateZ(48px);
  --face-back-color: #8f4a0b;
`;

const RightFace = styled(CrateFace)`
  transform: rotateY(90deg) translateZ(48px);
  --face-back-color: #8f4a0b;
`;

interface Props {
  sticker: string;
}
export default Crate;
