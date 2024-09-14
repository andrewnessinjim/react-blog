import React from "react";

import { BLOG_TITLE } from "@/constants";

import { Wrapper } from "./Logo.styled";

function Logo({ mobileAlignment = "left" }) {
  return (
    <Wrapper href="/" data-mobile-alignment={mobileAlignment}>
      {BLOG_TITLE}
    </Wrapper>
  );
}

export default Logo;
