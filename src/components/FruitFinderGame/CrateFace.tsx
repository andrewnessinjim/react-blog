import { motion } from "framer-motion";
import * as _ from "lodash-es";
import React from "react";
import styled, { css } from "styled-components";

export const FACE_Z_THICKNESS = 4;
const FACE_HEIGHT = 100;
const FACE_WIDTH = 100;

const CrateFace = React.forwardRef<HTMLDivElement, any>(function CrateFace(
  { className, sticker = "" }: Props,
  ref
) {
  return (
    <CrateFaceWrapper className={className} ref={ref}>
      <FaceFront />
      <FaceBack>{sticker && <FruitSticker>{sticker}</FruitSticker>}</FaceBack>
      <FaceTopEdge />
      <FaceBottomEdge />
      <FaceLeftEdge />
      <FaceRightEdge />
    </CrateFaceWrapper>
  );
});

const PassThroughFaceCSS = css`
  position: absolute;
  width: ${FACE_WIDTH}px;
  height: ${FACE_HEIGHT}px;
  transform-style: inherit;
`;

const CrateFaceWrapper = styled(motion.div)`
  ${PassThroughFaceCSS};
`;

const FaceFront = styled.div`
  ${PassThroughFaceCSS};
  transform: translateZ(${FACE_Z_THICKNESS / 2}px);
  background: linear-gradient(
      to right,
      hsl(18, 58%, 12%) 0px 2px,
      hsl(19, 64%, 21%) 2px 14px,
      hsl(18, 58%, 12%) 14px 16px,
      transparent 16px
    ),
    linear-gradient(
      to left,
      hsl(18, 58%, 12%) 0px 2px,
      hsl(19, 64%, 21%) 2px 14px,
      hsl(18, 58%, 12%) 14px 16px,
      transparent 16px
    ),
    repeating-linear-gradient(
      to bottom,
      hsl(18, 58%, 12%) 0px 4px,
      hsl(28, 85%, 30%) 2px 20px
    );
`;

const FaceBack = styled.div`
  ${PassThroughFaceCSS};
  background-color: hsl(18, 58%, 12%);
  transform: translateZ(${FACE_Z_THICKNESS / -2}px);
  border: 6px solid black;
`;

const FruitSticker = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  font-size: 50px;
`;

const Edge = styled.div`
  transform-style: inherit;
  background-color: black;
  position: absolute;
`;

const FaceTopEdge = styled(Edge)`
  width: ${FACE_WIDTH}px;
  height: ${FACE_Z_THICKNESS}px;
  transform: rotateX(90deg) translateZ(${FACE_Z_THICKNESS / 2}px);
`;

const FaceBottomEdge = styled(Edge)`
  width: ${FACE_WIDTH}px;
  height: ${FACE_Z_THICKNESS}px;
  transform: rotateX(-90deg) translateZ(${FACE_WIDTH - FACE_Z_THICKNESS / 2}px);
`;

const FaceLeftEdge = styled(Edge)`
  width: ${FACE_Z_THICKNESS}px;
  height: ${FACE_HEIGHT}px;
  transform: rotateY(90deg);
`;

const FaceRightEdge = styled(Edge)`
  width: ${FACE_Z_THICKNESS}px;
  height: ${FACE_HEIGHT}px;
  transform: rotateY(-90deg) translateZ(${-FACE_WIDTH + FACE_Z_THICKNESS / 2}px);
`;

interface Props {
  className?: string;
  sticker?: string;
}

export default CrateFace;
