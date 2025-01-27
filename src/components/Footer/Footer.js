import React from "react";
import Link from "next/link";

import Logo from "@/components/Logo";

import DecorativeSwoops from "./DecorativeSwoops";
import { Attribution, Content, Wrapper } from "./Footer.styled";
import Spacer from "../Spacer";

function Footer() {
  return (
    <Wrapper>
      <DecorativeSwoops />
      <Content>
        <div>
          <Logo mobileAlignment="center" />
          <a href="mailto:me@andrewnessin.com">Contact</a>
          {/*
            NOTE: If you'd like to build your blog on top
            of this code, the license requires that you leave
            this paragraph untouched. Check out LICENSE.md
            for more information.
          */}
          <Spacer size={20}/>
          <Attribution>
            Blog template created by{" "}
            <a href="https://www.joshwcomeau.com/">Josh W. Comeau</a>. Check out{" "}
            <a href="https://www.joyofreact.com/">The Joy of React</a> to learn
            how to build dynamic React apps like this one!
          </Attribution>
        </div>
      </Content>
    </Wrapper>
  );
}

export default Footer;
