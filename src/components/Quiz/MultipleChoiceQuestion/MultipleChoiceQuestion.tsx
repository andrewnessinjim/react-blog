"use client";

import * as React from "react";
import styled from "styled-components";
import SingleAnswerMCQ from "../SingleAnswerMCQ";
import MultiAnswerMCQ from "../MultiAnswerMCQ";
import { MultipleChoiceQuestionProps } from "../types";
import { CheckCircle, XCircle } from "react-feather";
import { motion } from "framer-motion";

const FEEDBACK_COLORS = {
  correct: {
    "--indicator-color": "hsl(120deg 100% 50%)",
  },
  incorrect: {
    "--indicator-color": "hsl(360deg 100% 50%)",
  },
};

function MultipleChoiceQuestion({
  answerType,
  correctAnswerFeedback,
  incorrectAnswerFeedback,
  ...delegated
}: MultipleChoiceQuestionProps) {
  const [status, setStatus] = React.useState<MCQStatus>("pending");

  const isPending = status === "pending";
  const isCorrect = status === "correctly_answered";

  const showFeedback = !isPending;

  const MCQType = answerType === "single" ? SingleAnswerMCQ : MultiAnswerMCQ;
  return (
    <Wrapper>
      <MCQType
        {...delegated}
        disabled={!isPending}
        onCorrect={() => setStatus("correctly_answered")}
        onIncorrect={() => setStatus("incorrectly_answered")}
      />
      <FeedbackWrapper
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: showFeedback ? 1 : 0
        }}
        style={{
          ...FEEDBACK_COLORS[isCorrect ? "correct" : "incorrect"],
        }}
      >
        {showFeedback && (
          <>
            <FeedbackIndicator>
              {isCorrect ? (
                <StCheckCircle size={64} />
              ) : (
                <StXCircle size={64} />
              )}
              <FeedbackIndicatorText>
                {isCorrect ? "Correct Answer" : "Incorrect Answer"}
              </FeedbackIndicatorText>
            </FeedbackIndicator>
            <FeedbackMessage>
              {isCorrect ? correctAnswerFeedback : incorrectAnswerFeedback}
            </FeedbackMessage>
          </>
        )}
      </FeedbackWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const FeedbackWrapper = styled(motion.div)`
  min-height: 128px;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-around;
  background-color: var(--color-decorative-100);

  & p {
    margin: 0;
  }
`;

const FeedbackIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: var(--indicator-color);
  font-weight: 600;
`;

const FeedbackMessage = styled.div``;

const FeedbackIndicatorText = styled.p`
  margin: 0;
  white-space: nowrap;
  font-size: 1rem;
`;

const StCheckCircle = styled(CheckCircle)``;

const StXCircle = styled(XCircle)``;

type MCQStatus = "pending" | "correctly_answered" | "incorrectly_answered";

export default MultipleChoiceQuestion;
