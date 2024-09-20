import { MEDIA_QUERIES } from "@/constants";
import useToggle from "@/hooks/useToggle";
import React from "react";
import styled from "styled-components";
import NoMarginParagraph from "../NoMarginParagraph";

function ControlPanel({
  onStartObserve,
  onEndObserve,
  threshold,
  onThresholdChange,
  rootMargin,
  onRootMarginChange,
}: Props) {
  const [isObserving, toggleIsObserving] = useToggle(false);
  const id = React.useId();

  const thresholdId = "thresholdRange" + id;
  const rootMarginId = "rootMargin" + id;

  return (
    <Wrapper>
      <RootMarginWrapper>
        <label htmlFor={rootMarginId}>Root margin</label>
        <RootMarginInput
          type="range"
          disabled={isObserving}
          id={rootMarginId}
          min={-80}
          max={80}
          step={20}
          value={rootMargin}
          onChange={(e) => onRootMarginChange(parseInt(e.target.value))}
        />
        <MarginValuesWrapper>
          <NoMarginParagraph>0px</NoMarginParagraph>
          <NoMarginParagraph>0px</NoMarginParagraph>
          <BottomMarginDisplay>{rootMargin}px</BottomMarginDisplay>
          <NoMarginParagraph>0px</NoMarginParagraph>
        </MarginValuesWrapper>
      </RootMarginWrapper>
      <ThresholdWrapper>
        <label htmlFor={thresholdId}>Threshold</label>
        <ThresholdInput
          disabled={isObserving}
          id={thresholdId}
          type="range"
          min={0}
          max={1}
          step={0.5}
          value={threshold}
          onChange={(e) => onThresholdChange(parseFloat(e.target.value))}
        />
      </ThresholdWrapper>

      <ControlButton
        onClick={() => {
          if (!isObserving) {
            onStartObserve?.();
          } else {
            onEndObserve?.();
          }
          toggleIsObserving();
        }}
      >
        {isObserving ? "Stop Observing" : "🤨 Start Observing"}
      </ControlButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: flex-start;
  padding-left: 32px;
  @media ${MEDIA_QUERIES.tabletAndBelow} {
    padding-left: revert;
  }
`;

const ThresholdWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ThresholdInput = styled.input`
  width: 200px;  
`;

const RootMarginWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MarginValuesWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const RootMarginInput = styled.input`
    width: 200px;
`;

const BottomMarginDisplay = styled.p`
  margin: 0;
  width: 72px;
  background-color: var(--color-gray-300);
  padding: 2px 4px;
  border-radius: 4px;
  border: 2px dotted var(--color-gray-500);
  text-align: center;
`;

const ControlButton = styled.button`
  padding: 6px 12px;
  width: 180px;
  align-self: center;
`;

interface Props {
  onStartObserve?: () => void;
  onEndObserve?: () => void;
  threshold?: number;
  onThresholdChange: (threshold: number) => void;
  rootMargin?: number;
  onRootMarginChange: (rootMargin: number) => void;
}

export default ControlPanel;
