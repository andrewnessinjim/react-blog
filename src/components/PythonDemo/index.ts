import dynamic from "next/dynamic";

export * from "./ZipDemo/PythonZipDemo";

const LazyPythonZipDemo = dynamic(() => import("./ZipDemo/PythonZipDemo"));
export { LazyPythonZipDemo };

const LazyPythonZipLongDemo = dynamic(
  () => import("./ZipLongDemo/PythonZipLongDemo")
);
export { LazyPythonZipLongDemo };
