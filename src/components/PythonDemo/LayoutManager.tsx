import { MEDIA_QUERIES } from "@/constants";
import { LayoutGroup } from "framer-motion";
import styled from "styled-components";

interface Props {
  inputBoard: React.ReactNode;
  outputLogs: React.ReactNode;
  outputBoard: React.ReactNode;
  inputCode: React.ReactNode;
  animationControls: React.ReactNode;
  outputPrintedValue: React.ReactNode;
  extras?: React.ReactNode;
}

function LayoutManager({
  extras,
  inputBoard,
  outputLogs,
  outputBoard,
  inputCode,
  animationControls,
  outputPrintedValue,
}: Props) {
  return (
    <LayoutGroup>
      <Wrapper>
        {extras && <ExtrasWrapper>{extras}</ExtrasWrapper>}
        <InputBoardWrapper>
          <InputFlexWrapper>
            <FlexOrderBoardWrapper>{inputBoard}</FlexOrderBoardWrapper>
            {outputLogs && (
              <FlexOrderOutputLogsWrapper>
                {outputLogs}
              </FlexOrderOutputLogsWrapper>
            )}
          </InputFlexWrapper>
        </InputBoardWrapper>
        {outputBoard && <OutputBoardWrapper>{outputBoard}</OutputBoardWrapper>}
        <AnimationControlsWrapper>{animationControls}</AnimationControlsWrapper>
        <InputCodeWrapper>{inputCode}</InputCodeWrapper>
        <OutputPrintValueWrapper>{outputPrintedValue}</OutputPrintValueWrapper>
      </Wrapper>
    </LayoutGroup>
  );
}

const Wrapper = styled.div`
  --gap: 8px;
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  grid-template-rows: auto 260px auto auto auto;
  grid-template-areas:
    "extras extras"
    "input-board output-board"
    "controls output-board"
    "code printed-value";

  gap: 24px;
  min-height: 520px;
  max-width: 620px;
  margin-inline-start: auto;
  margin-inline-end: auto;

  /* Ensure cover blanket is not visible */
  background-color: var(--color-backdrop);
  padding: 48px;

  border-radius: 8px;

  @media ${MEDIA_QUERIES.phoneAndBelow} {
    padding: 24px;
    gap: 12px;

    display: flex;
    flex-direction: column;
  }
`;

const ExtrasWrapper = styled.div`
  grid-area: extras;
`;

const InputBoardWrapper = styled.div`
  grid-area: input-board;
`;

const InputFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FlexOrderBoardWrapper = styled.div`
  order: 0;
  @media ${MEDIA_QUERIES.phoneAndBelow} {
    order: 1;
  }
`;

const FlexOrderOutputLogsWrapper = styled.div`
  order: 1;
  @media ${MEDIA_QUERIES.phoneAndBelow} {
    order: 0;
  }
  min-height: 58px;
`;

const InputCodeWrapper = styled.div`
  grid-area: code;
`;

const OutputBoardWrapper = styled.div`
  grid-area: output-board;
  min-height: 200px;
`;

const OutputPrintValueWrapper = styled.div`
  grid-area: printed-value;
`;

const AnimationControlsWrapper = styled.div`
  grid-area: controls;
`;

export default LayoutManager;
