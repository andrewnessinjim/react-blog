import React from "react";
import SandpackLiveEditor from "./SandpackLiveEditor";
import { getProjectFiles } from "@/helpers/file-helpers";
import * as _ from "lodash-es";

async function SandpackDemo({ projectSubDir, ...delegated }: Props) {
  let projectFiles: { [x: string]: string };

  const hostName = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  projectFiles = await getProjectFiles(projectSubDir);

  projectFiles = _.mapValues(projectFiles, (fileContent: string) =>
    fileContent.replaceAll("{{HOSTNAME}}", hostName)
  );

  return <SandpackLiveEditor files={projectFiles} {...delegated} />;
}

interface Props {
  projectSubDir: string;
}

export default SandpackDemo;
