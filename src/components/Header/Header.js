import React from "react";

import Logo from "@/components/Logo";

import { Actions, Wrapper } from "./Header.styled";
import ThemeToggle from "./ThemeToggle";
import Boop from "../Boop";

function Header({ ...delegated }) {
  return (
    <Wrapper {...delegated}>
      <Logo />

      <Actions>
        <Boop rotation={25}>
          <ThemeToggle />
        </Boop>
      </Actions>
    </Wrapper>
  );
}

export default Header;
