"use client";

import * as React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

function Quiz({ children }: Props) {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);

  function showPreviousQuestion() {
    setCurrentQuestion(currentQuestion - 1);
  }

  function showNextQuestion() {
    setCurrentQuestion(currentQuestion + 1);
  }

  const previousBtnDisabled = currentQuestion === 0;
  const nextBtnDisabled = currentQuestion === children.length - 1;

  const moreThanOneQuestion = children.length >= 1;

  return (
    <Wrapper>
      <Scroller>
        <QuestionList
          animate={{
            x: -100 * currentQuestion + "%",
          }}
          transition={{
            type: "spring",
            damping: 40,
            stiffness: 300,
            restDelta: 0.01,
          }}
        >
          {children &&
            React.Children.toArray(children).map((question, index) => (
              <QuestionWrapper key={index}>{question}</QuestionWrapper>
            ))}
        </QuestionList>
        {moreThanOneQuestion && (
          <NavButtonsWrapper>
            <NavButton
              disabled={previousBtnDisabled}
              onClick={showPreviousQuestion}
            >
              Previous
            </NavButton>
            <NavButton disabled={nextBtnDisabled} onClick={showNextQuestion}>
              Next
            </NavButton>
          </NavButtonsWrapper>
        )}
      </Scroller>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 32px;
  background-color: var(--color-gray-100);
  border-radius: 8px;
`;

const Scroller = styled.div`
  overflow-x: hidden;
`;

const QuestionList = styled(motion.ul)`
  white-space: nowrap;
  display: flex;
`;

const QuestionWrapper = styled.li`
  margin: 0;
  min-width: 100%;
  max-width: 100%;
  display: inline-block;
  white-space: wrap;
  padding: 16px;
  border-radius: 8px;
`;

const NavButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
`;

const NavButton = styled.button`
  width: 90px;
  padding: 6px 12px;
`;

interface Props {
  children: React.ReactNode[];
}

export default Quiz;
