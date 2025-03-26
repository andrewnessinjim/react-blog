import styled from "styled-components";
import Button from "../Button";

interface Props {
  onClick: () => void;
  children: string;
}

function ItemButton({ onClick, children }: Props) {
  return (
    <Wrapper
      variant="secondary"
      size="small"
      layout={true}
      onClick={onClick}
      exit={{ opacity: 0 }}
    >
      {children}
    </Wrapper>
  );
}

const Wrapper = styled(Button)`
  width: 32px;
  aspect-ratio: 1;
  align-self: center;
`;

export default ItemButton;
