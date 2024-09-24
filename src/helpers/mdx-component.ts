import CodeSnippet from "@/components/CodeSnippet";
import IntersectionObserverVisualizer from "@/components/IntersectionObserverVisualizer";
import { IndependentViewport } from "@/components/IntersectionObserverVisualizer/Viewport";
import IndependentPage from "@/components/IntersectionObserverVisualizer/Page";
import NoMarginParagraph from "@/components/NoMarginParagraph";
import SandpackDemo from "@/components/SandpackDemo";
import Quiz from "@/components/Quiz/Quiz";
import Spacer from "@/components/Spacer";
import Choice from "@/components/Quiz/Choice";
import MultipleChoiceQuestion from "@/components/Quiz/MultipleChoiceQuestion";
import InlineVideo from "@/components/InlineVideo";

const COMPONENTS = {
  Spacer,
  pre: CodeSnippet,
  SandpackDemo,
  IntersectionObserverVisualizer,
  IndependentPage,
  IndependentViewport,
  NoMarginParagraph,
  Quiz,
  Choice,
  MultipleChoiceQuestion,
  InlineVideo,
};

export default COMPONENTS;