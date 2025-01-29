"use client";

import * as React from "react";
import styled from "styled-components";

import { motion } from "framer-motion";

function DatabaseIndexDemo() {
  return (
    <Wrapper>
      <motion.svg
        width="200px"
        height="200px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1
          }}
          d="M4 12.6111L8.92308 17.5L20 6.5"
          stroke="#fff"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default DatabaseIndexDemo;
