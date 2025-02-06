import React from "react";

import Logo from "@/components/Logo";

import { Actions, Wrapper } from "./Header.styled";

function Header({ ...delegated }) {
  return (
    <Wrapper {...delegated}>
      <Logo />

      <Actions>{/* <ThemeToggle /> */}</Actions>
    </Wrapper>
  );
}

export default Header;
