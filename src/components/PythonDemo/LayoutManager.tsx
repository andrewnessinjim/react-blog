import { LayoutGroup } from "framer-motion";
import styled from "styled-components";

interface Props {
  inputBoard: React.ReactNode;
  outputBoard: React.ReactNode;
  inputCode: React.ReactNode;
  animationControls: React.ReactNode;
  outputPrintedValue: React.ReactNode;
  extras?: React.ReactNode;
}

function LayoutManager({
  extras,
  inputBoard,
  outputBoard,
  inputCode,
  animationControls,
  outputPrintedValue,
}: Props) {
  return (
    <LayoutGroup>
      <Wrapper>
        {extras && <ExtrasWrapper>{extras}</ExtrasWrapper>}
        <InputBoardWrapper>{inputBoard}</InputBoardWrapper>
        <InputCodeWrapper>{inputCode}</InputCodeWrapper>
        <OutputBoardWrapper>{outputBoard}</OutputBoardWrapper>
        <AnimationControlsWrapper>{animationControls}</AnimationControlsWrapper>
        <OutputPrintValueWrapper>{outputPrintedValue}</OutputPrintValueWrapper>
      </Wrapper>
    </LayoutGroup>
  );
}

const Wrapper = styled.div`
  --gap: 8px;
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  grid-template-rows: auto 280px auto auto auto;
  grid-template-areas:
    "extras extras"
    "input-board output-board"
    "controls output-board"
    "code printed-value";

  gap: 24px;
  padding: 16px;
  min-height: 520px;
  max-width: 620px;
  margin-inline-start: auto;
  margin-inline-end: auto;

  /* Ensure cover blanket is not visible */
  background-color: var(--color-backdrop);
  padding: 48px;

  border-radius: 8px;
`;

const ExtrasWrapper = styled.div`
  grid-area: extras;
`;

const InputBoardWrapper = styled.div`
  grid-area: input-board;
`;

const InputCodeWrapper = styled.div`
  grid-area: code;
`;

const OutputBoardWrapper = styled.div`
  grid-area: output-board;
`;

const OutputPrintValueWrapper = styled.div`
  grid-area: printed-value;
`;

const AnimationControlsWrapper = styled.div`
  grid-area: controls;
`;

export default LayoutManager;
