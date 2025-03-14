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
import StorageMatrix from "@/components/StorageMatrix";
import FruitFinderGame from "@/components/FruitFinderGame";
import NextImage from "@/components/NextImage";
import InfoPopover from "@/components/InfoPopover";
import StyledTable from "@/components/StyledTable";
import DatabaseIndexDemo from "@/components/DatabaseIndexDemo";
import DesktopOnly from "@/components/DesktopOnly";
import PythonZipDemo from "@/components/PythonZipDemo";

const COMPONENTS = {
  Spacer,
  NextImage,
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
  StorageMatrix,
  FruitFinderGame,
  InfoPopover,
  table: StyledTable,
  DatabaseIndexDemo,
  DesktopOnly,
  PythonZipDemo
};

export default COMPONENTS;
