import dynamic from "next/dynamic";

export * from "./SandpackDemo";

const LazySandpackDemo = dynamic(() => import("./SandpackDemo"));
export default LazySandpackDemo;
