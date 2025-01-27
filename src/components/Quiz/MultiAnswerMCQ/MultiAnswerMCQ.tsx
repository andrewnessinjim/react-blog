"use client";

import * as React from "react";
import styled from "styled-components";

import Question from "../Question";
import ChoiceList from "../ChoiceList";
import * as _ from "lodash-es";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "react-feather";
import { MultiAnswerMCQProps } from "../types";
import { AnimatePresence, motion } from "framer-motion";

function MultiAnswerMCQ({
  question,
  children: choices,
  onCorrect,
  onIncorrect,
  disabled,
}: MultiAnswerMCQProps) {
  const [selectedAnswers, setSelectedAnswers] = React.useState(
    _.fill(Array(choices.length), false)
  );

  const id = React.useId();
  const correctAnswers = choices.map((choice) => choice.props.correct === true);

  function updateSelectedAnswersState(
    index: number,
    checked: Checkbox.CheckedState
  ) {
    const nextSelectedAnswers = _.clone(selectedAnswers);
    nextSelectedAnswers[index] = checked === true ? true : false;
    setSelectedAnswers(nextSelectedAnswers);
  }

  function evaluateAnswer(e: React.SyntheticEvent) {
    e.preventDefault();
    if (_.isEqual(selectedAnswers, correctAnswers)) {
      onCorrect();
    } else {
      onIncorrect();
    }
  }

  return (
    <Wrapper>
      <Question>{question}</Question>
      <ChoiceList>
        {choices.map((choiceChild, index) => {
          const choiceId = `${id}-${index}`;

          return (
            <ChoiceWrapper key={index}>
              <CheckboxRoot
                disabled={disabled}
                id={choiceId}
                checked={selectedAnswers[index]}
                onCheckedChange={(checked) =>
                  updateSelectedAnswersState(index, checked)
                }
              >
                <CheckboxIndicator>
                  <CheckIcon />
                </CheckboxIndicator>
              </CheckboxRoot>
              <label htmlFor={choiceId}>{choiceChild}</label>
            </ChoiceWrapper>
          );
        })}
      </ChoiceList>
      <SubmitButtonPlaceholder>
        <AnimatePresence>
          {!disabled && (
            <SubmitButton
              onClick={evaluateAnswer}
              exit={{
                opacity: 0,
              }}
            >
              Submit
            </SubmitButton>
          )}
        </AnimatePresence>
      </SubmitButtonPlaceholder>
    </Wrapper>
  );
}

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ChoiceWrapper = styled.li`
  display: flex;
  gap: 24px;
  align-items: center;
  margin: 0;
`;

const CheckboxRoot = styled(Checkbox.Root)`
  min-width: 32px;
  height: 32px;
  display: grid;
  place-content: center;
  border-radius: 4px;
  border: 2px solid var(--color-primary-500);
  background-color: var(--color-gray-100);
  &[data-disabled] {
    background-color: var(--color-gray-300);
    border: none;
  }
`;

const CheckboxIndicator = styled(Checkbox.Indicator)`
  --stroke: var(--color-primary-500);

  &[data-disabled] {
    --stroke: var(--color-gray-700);
  }
`;

const CheckIcon = styled(Check)`
  stroke-width: 3;
  stroke: var(--stroke);
`;

const SubmitButtonPlaceholder = styled.div`
  height: 40px;
  display: grid;
  place-content: center;
`;

const SubmitButton = styled(motion.button)`
  align-self: center;
  padding: 8px 16px;
  background-color: var(--color-primary-100);
  border-radius: 8px;
  border: 2px solid var(--color-primary-500);
`;

export default MultiAnswerMCQ;
