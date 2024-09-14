import React from "react";
import { Rss } from "react-feather";

import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";

import ThemeToggle from "./ThemeToggle";
import { Action, Actions, Wrapper } from "./Header.styled";

function Header({ ...delegated }) {
  return (
    <Wrapper {...delegated}>
      <Logo />

      <Actions>
        <Action>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </Action>
        <ThemeToggle />
      </Actions>
    </Wrapper>
  );
}

export default Header;
