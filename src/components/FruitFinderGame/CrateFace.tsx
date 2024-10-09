import _ from "lodash-es";
import styled, { css } from "styled-components";

export const FACE_Z_THICKNESS = 4;
const FACE_HEIGHT = 100;
const FACE_WIDTH = 100;

function CrateFace({ className, sticker = "" }: Props) {
  return (
    <CrateFaceWrapper className={className}>
      <FaceFront>
        {_.range(5).map((num) => (
          <HorizontalPlank
            style={{
              gridRow: num + 1,
            }}
            key={num}
          />
        ))}

        <VerticalPlank
          style={{
            gridColumn: 1,
          }}
        />
        <VerticalPlank
          style={{
            gridColumn: -2,
          }}
        />
      </FaceFront>
      <FaceBack>
        {sticker &&
          <FruitSticker>
            {sticker}
          </FruitSticker>
        }
      </FaceBack>
      <FaceTopEdge />
      <FaceBottomEdge />
      <FaceLeftEdge />
      <FaceRightEdge />
    </CrateFaceWrapper>
  );
}

const PassThroughFaceCSS = css`
  position: absolute;
  width: ${FACE_WIDTH}px;
  height: ${FACE_HEIGHT}px;
  transform-style: inherit;
`;

const CrateFaceWrapper = styled.div`
 ${PassThroughFaceCSS};
`;

const FaceFront = styled.div`
  ${PassThroughFaceCSS};
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(8, 1fr);
  will-change: transform;
  transform: translateZ(${FACE_Z_THICKNESS / 2}px);
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
`

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

const HorizontalPlank = styled.div`
  background-color: hsl(28, 85%, 30%);
  border: 2px solid hsl(18, 58%, 12%);
  grid-column: -1/1;
`;

const VerticalPlank = styled.div`
  background-color: hsl(19, 64%, 21%);
  border: 2px solid hsl(18, 58%, 12%);
  grid-row: -1/1;
`;

interface Props {
  className?: string,
  sticker?: string
}
export default CrateFace;