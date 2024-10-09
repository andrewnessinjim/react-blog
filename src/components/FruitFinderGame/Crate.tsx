import _ from "lodash-es";
import styled, { keyframes } from "styled-components";
import CrateFace from "./CrateFace";
import React from "react";
import { motion } from "framer-motion";
import useHover from "@/hooks/useHover";

function Crate({ sticker }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHovered, hoverRef] = useHover<HTMLDivElement>();

  return (
    <Wrapper
      ref={hoverRef}
      onClick={() => setIsOpen(true)}
      $isOpen={isOpen}
      animate={{
        rotateX: isOpen || isHovered ? -45 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 20,
      }}
    >
      <FrontFace />
      <TopFaceWrapper>
        <TopFace
          initial={{
            transformOrigin: "top"
          }}
          animate={{
            rotateX: isOpen ? 45 : 0,
            transformOrigin: "top",
          }}
        />
      </TopFaceWrapper>
      <BackFace sticker={isOpen ? sticker : ""} />
      <LeftFace />
      <RightFace />
      <BottomFace />
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)<{ $isOpen: boolean }>`
  position: relative;
  width: 100px;
  height: 100px;
  transform-style: preserve-3d;
  cursor: pointer;
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

const TopFace = motion(styled(CrateFace)``);

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
