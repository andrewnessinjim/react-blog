import React from "react";

import Logo from "@/components/Logo";

import { Actions, Wrapper } from "./Header.styled";
import ThemeToggle from "./ThemeToggle";

function Header({ ...delegated }) {
  return (
    <Wrapper {...delegated}>
      <Logo />

      <Actions>
        <ThemeToggle />
      </Actions>
    </Wrapper>
  );
}

export default Header;
