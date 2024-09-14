import React from "react";
import { Wrapper } from "./VisuallyHidden.styled";

function VisuallyHidden({
  as: Element = "span",
  children,
  ...delegated
}) {
  return (
    <Wrapper
      as={Element}
      {...delegated}
    >
      {children}
    </Wrapper>
  );
}

export default VisuallyHidden;
