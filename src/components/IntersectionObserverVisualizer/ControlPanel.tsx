import useToggle from "@/hooks/useToggle";
import styled from "styled-components";

function ControlPanel({ onStartObserve, onEndObserve }: Props) {
  const [isObserving, toggleIsObserving] = useToggle(false);

  return (
    <Wrapper>
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
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const ControlButton = styled.button`
  padding: 6px 12px;
  width: 180px;
`;

interface Props {
  onStartObserve?: () => void;
  onEndObserve?: () => void;
}

export default ControlPanel;
