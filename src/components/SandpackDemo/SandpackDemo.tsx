import React from "react";
import SandpackLiveEditor from "./SandpackLiveEditor";
import { getProjectFiles } from "@/helpers/file-helpers";

async function SandpackDemo({ projectSubDir, ...delegated }: Props) {
  let projectFiles;
  if (projectSubDir) {
    projectFiles = await getProjectFiles(projectSubDir);
  }
  return <SandpackLiveEditor files={projectFiles} {...delegated} />;
}

interface Props {
  projectSubDir?: string;
}

export default SandpackDemo;
