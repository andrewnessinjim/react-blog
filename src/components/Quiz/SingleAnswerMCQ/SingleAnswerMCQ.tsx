"use client";

import * as React from "react";
import styled from "styled-components";
import Question from "../Question";
import ChoiceList from "../ChoiceList";
import Spacer from "@/components/Spacer";
import { SingleAnswerMCQProps } from "../types";

function SingleAnswerMCQ({ question, children }: SingleAnswerMCQProps) {
  return (
    <Wrapper>
      <Question>{question}</Question>
      <Spacer size={16} />
      <ChoiceList>{children}</ChoiceList>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default SingleAnswerMCQ;
