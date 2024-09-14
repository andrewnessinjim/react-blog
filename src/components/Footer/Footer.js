import React from 'react';
import Link from 'next/link';

import Logo from '@/components/Logo';

import DecorativeSwoops from './DecorativeSwoops';
import { Attribution, Content, LinkHeading, LinkList, Wrapper } from './Footer.styled';

function Footer() {
  return (
    <Wrapper>
      <DecorativeSwoops />
      <Content>
        <div>
          <Logo mobileAlignment="center" />
          {/*
            NOTE: If you'd like to build your blog on top
            of this code, the license requires that you leave
            this paragraph untouched. Check out LICENSE.md
            for more information.
          */}
          <Attribution>
            Blog template created by{' '}
            <a href="https://www.joshwcomeau.com/">
              Josh W. Comeau
            </a>
            . Check out{' '}
            <a href="https://www.joyofreact.com/">
              The Joy of React
            </a>{' '}
            to learn how to build dynamic React apps like
            this one!
          </Attribution>
        </div>
        <nav>
          <LinkHeading>Links</LinkHeading>
          <LinkList>
            <li>
              <Link href="/rss">RSS feed</Link>
            </li>
            <li>
              <Link href="/todo">Terms of Use</Link>
            </li>
            <li>
              <Link href="/todo">Privacy Policy</Link>
            </li>
            <li>
              <a href="https://twitter.com/JoshWComeau">
                Twitter
              </a>
            </li>
          </LinkList>
        </nav>
      </Content>
    </Wrapper>
  );
}

export default Footer;
