import React from "react";
import SandpackLiveEditor from "./SandpackLiveEditor";
import { getProjectFiles } from "@/helpers/file-helpers";

async function SandpackDemo({ projectSubDir }: Props) {
  let projectFiles = null;
  if (projectSubDir) {
    projectFiles = await getProjectFiles(projectSubDir);
  }
  return <SandpackLiveEditor files={projectFiles} />;
}

interface Props {
  projectSubDir?: string;
}

export default SandpackDemo;
