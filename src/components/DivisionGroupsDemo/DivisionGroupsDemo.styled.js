"use client";

import styled from "styled-components";
import Card from "../Card";
import SliderControl from "../SliderControl";
import { motion } from "framer-motion";

export const Wrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

export const Slider = styled(SliderControl)`
  width: 250px;
`;

export const DemoWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
`;

export const DemoArea = styled.div`
  display: grid;
  grid-gap: 16px;
  height: 300px;
  border: 2px solid var(--color-gray-500);
  padding: 16px;
`;

export const Group = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  align-content: center;
  padding: 8px;
  border: 1px solid var(--color-gray-300);
`;

export const Item = styled(motion.div)`
  position: relative;
  z-index: 2;
  width: 32px;
  height: 32px;
  background: var(--color-secondary);
  border-radius: 1000px;
  /*
      These styles not actually used in the final product,
      but they help illustrate
    */
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

export const RemainderArea = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  /* background: var(--color-gray-100); */
  border: 1px solid var(--color-gray-300);
  height: 64px;
  width: 100%;
  max-width: 600px;
  margin-top: 16px;
`;

export const RemainderHeading = styled.p`
  position: absolute;
  top: 0px;
  left: -1px;
  padding: 4px 8px 0px;
  border: 1px solid var(--color-gray-300);
  border-bottom: none;
  background: var(--color-card-background);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transform: translateY(-100%);
  border-radius: 2px 2px 0px 0px;
`;