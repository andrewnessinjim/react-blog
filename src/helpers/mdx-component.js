import CodeSnippet from '@/components/CodeSnippet';
import IntersectionObserverVisualizer from '@/components/IntersectionObserverVisualizer';
import { IndependentViewport } from '@/components/IntersectionObserverVisualizer/Viewport';
import IndependentPage from '@/components/IntersectionObserverVisualizer/Page';
import NoMarginParagraph from '@/components/NoMarginParagraph';
import SandpackDemo from '@/components/SandpackDemo';

const COMPONENTS = {
    pre: CodeSnippet,
    SandpackDemo,
    IntersectionObserverVisualizer,
    IndependentPage,
    IndependentViewport,
    NoMarginParagraph
}

export default COMPONENTS;