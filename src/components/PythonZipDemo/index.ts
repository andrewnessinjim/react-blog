import dynamic from 'next/dynamic';

export * from './PythonZipDemo';

const LazyPythonZipDemo = dynamic(() => import("./PythonZipDemo"));
export default LazyPythonZipDemo;