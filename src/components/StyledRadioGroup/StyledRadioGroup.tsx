import * as React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Label } from "@radix-ui/react-label";
import { motion } from "framer-motion";
import styled from "styled-components";

interface Props {
  options: {
    [key: string]: string;
  };
  value: string;
  onChange: (value: string) => void;
}

function StyledRadioGroup({ options, value, onChange }: Props) {
  const id = React.useId();
  return (
    <Wrapper value={value} onValueChange={onChange}>
      {Object.keys(options).map((optionKey, index) => {
        const itemId = id + index;
        return (
          <ItemWrapper key={optionKey}>
            <RadioGroupItem value={optionKey} id={itemId}>
              <RadioGroupIndicator>
                <Indicator
                  initial={{
                    scale: 0,
                  }}
                  animate={{
                    scale: 1,
                  }}
                />
              </RadioGroupIndicator>
            </RadioGroupItem>
            <Label htmlFor={itemId}>{options[optionKey]}</Label>
          </ItemWrapper>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled(RadioGroup.Root)`
  display: flex;
  gap: 16px;
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-items: center;
  gap: 4px;
`;

const RadioGroupItem = styled(RadioGroup.Item)`
  width: 24px;
  height: 24px;
  border-radius: 9999px;
  border: none;
  background-color: var(--color-gray-300);
`;

const RadioGroupIndicator = styled(RadioGroup.Indicator)`
  display: grid;
  place-items: center;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 9999;
`;

const Indicator = styled(motion.div)`
  width: 50%;
  aspect-ratio: 1 / 1;
  border-radius: 9999px;
  background: var(--color-primary-500);
`;

export default StyledRadioGroup;
