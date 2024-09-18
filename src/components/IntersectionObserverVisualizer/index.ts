import dynamic from 'next/dynamic';

export * from './IntersectionObserverVisualizer';

const LazyIntersectionObserverVisualizer = dynamic(() => import("./IntersectionObserverVisualizer"));
export default LazyIntersectionObserverVisualizer;