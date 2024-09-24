import React from "react";
import SandpackLiveEditor from "./SandpackLiveEditor";
import { getProjectFiles } from "@/helpers/file-helpers";
import { headers } from "next/headers";
import _ from "lodash-es";

async function SandpackDemo({ projectSubDir, ...delegated }: Props) {
  let projectFiles: { [x: string]: string };

  const hostName = headers().get("host") || "localhost:3000";

  projectFiles = await getProjectFiles(projectSubDir);

  let protocol = hostName.includes("localhost") ? "http" : "https";

  projectFiles = _.mapValues(projectFiles, (fileContent: string) =>
    fileContent.replaceAll("{{HOSTNAME}}", protocol + "://" + hostName)
  );

  return <SandpackLiveEditor files={projectFiles} {...delegated} />;
}

interface Props {
  projectSubDir: string;
}

export default SandpackDemo;
