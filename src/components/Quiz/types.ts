import { ReactElement } from "react";

type AnswerType = "single" | "multiple";

interface BaseMCQProps {
  question: string;
  children: ReactElement[];
}

interface SharedMCQProps extends BaseMCQProps {
  disabled: boolean;
  onCorrect: () => void;
  onIncorrect: () => void;
}
export interface MultipleChoiceQuestionProps extends BaseMCQProps {
  answerType: AnswerType;
  correctAnswerFeedback: React.ReactNode;
  incorrectAnswerFeedback: React.ReactNode;
}

export interface SingleAnswerMCQProps extends SharedMCQProps {}
export interface MultiAnswerMCQProps extends SharedMCQProps {}
