import { motion } from "framer-motion";
import React from "react";
import styled, { css } from "styled-components";

interface Props {
  editable: boolean;
  value?: string | null;
  onChange?: (value: string) => void;
}

function Cell({ editable, value, onChange }: Props) {
  return editable ? (
    <CellInput
      type="number"
      max={99}
      value={value ?? "0"}
      onChange={(e) => {
        const enteredValue = e.target.value;

        let sanitizedValue = enteredValue.replace(/^0+/, "");
        if (parseInt(sanitizedValue) > 99) {
          sanitizedValue = "99";
        }

        onChange?.(sanitizedValue === "" ? "0" : sanitizedValue);
      }}
    />
  ) : (
    <CellSpan>{value}</CellSpan>
  );
}

const cellStyles = css`
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  color: var(--color-primary-500);
  font-size: 1.25rem;
  text-align: center;

  width: 48px;
  aspect-ratio: 1;
  text-align: center;
  border: 2px dashed var(--color-primary-900);
  border-radius: 5px;
  background: transparent;
`;

const CellInput = styled(motion.input)`
  ${cellStyles};
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: textfield;
  appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const CellSpan = styled.span`
  ${cellStyles};
  display: grid;
  place-content: center;
`;
export default Cell;
