import { motion } from "framer-motion";
import * as React from "react";
import styled from "styled-components";

type Variant = "primary" | "secondary";
type Size = "small" | "regular" | "large";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: string;
}

const SIZE = {
  small: {
    "--fontSize": "14px",
    "--padding": "2px 4px",
    "--borderRadius": "2px",
    "--borderWidth": "2px",
  },
  regular: {
    "--fontSize": "16px",
    "--padding": "4px 8px",
    "--borderRadius": "4px",
    "--borderWidth": "2px",
  },
  large: {
    "--fontSize": "20px",
    "--padding": "6px 12px",
    "--borderRadius": "8px",
    "--borderWidth": "3px",
  },
};

const VARIANT = {
  primary: {
    "--borderStyle": "solid",
    "--background": "var(--color-primary-500)",
    "--color": "var(--color-gray-100)",
  },
  secondary: {
    "--borderStyle": "solid",
    "--background": "none",
    "--color": "var(--color-primary-500)",
  },
};

function Button({
  variant = "primary",
  size = "regular",
  children,
  ...delegated
}: Props) {
  return (
    //@ts-ignore
    <Wrapper
      key={children}
      style={
        {
          ...SIZE[size],
          ...VARIANT[variant],
        } as React.CSSProperties
      }
      whileTap={{
        scale: 0.8,
      }}
      transition={{ type: "spring", duration: 1, bounce: 0.5 }}
      {...delegated}
    >
      {children}
    </Wrapper>
  );
}

const Wrapper = styled(motion.button)`
  cursor: pointer;
  padding: var(--padding);
  font-size: var(--fontSize);
  border-radius: var(--borderRadius);
  border-style: var(--borderStyle);
  border-width: var(--borderWidth);
  background: var(--background);
  border-color: var(--color-primary-500);
  color: var(--color);
`;

export default Button;
