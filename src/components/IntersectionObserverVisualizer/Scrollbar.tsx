import * as Slider from "@radix-ui/react-slider";
import { ComponentProps } from "react";
import styled from "styled-components";

function Scrollbar(delegated: ComponentProps<typeof Slider.Root>) {
  return (
    <Root defaultValue={[0]} {...delegated}>
      <Track>
        <Range />
      </Track>
      <Thumb />
    </Root>
  );
}

const Root = styled(Slider.Root)`
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  touch-action: none;
  width: 20px;
  height: 180px;
  flex-direction: column;
`;

const Track = styled(Slider.Track)`
  &[data-disabled] {
    background-color: var(--color-gray-500);
  }
  background-color: var(--color-primary-900);
  position: relative;
  flex-grow: 1;
  height: 180px;
  width: 20px;
`;

const Range = styled(Slider.Range)`
  position: absolute;
  width: 100%;
`;

const Thumb = styled(Slider.Thumb)`
  display: block;
  width: 20px;
  height: 40px;
  box-shadow: 0 2px 10px var(--black-a7);

  background-color: var(--color-primary-500);
  &:hover {
    background-color: var(--color-primary-300);
  }
  &[data-disabled] {
    background-color: var(--color-gray-300);
  }
`;

export default Scrollbar;
