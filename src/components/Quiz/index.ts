import dynamic from 'next/dynamic';

export * from './Quiz';


const LazyQuiz = dynamic(() => import("./Quiz"));
export default LazyQuiz;