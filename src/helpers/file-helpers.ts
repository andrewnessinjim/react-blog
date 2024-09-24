import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import React from "react";
import { SandpackFiles } from "@codesandbox/sandpack-react";

export async function getProjectFiles(projectSubDir: string) {
  const projectDir = "/sandpack-projects/" + projectSubDir;
  const fileNames = await readDirectory(projectDir);
  const filesContents: SandpackFiles = {};

  for (let fileName of fileNames) {
    const rawContent = await readFile(`${projectDir}/${fileName}`);
    filesContents[fileName] = rawContent;
  }

  return filesContents;
}

export async function getBlogPostList() {
  const fileNames = await readDirectory("/content");

  const blogPosts = [];

  for (let fileName of fileNames) {
    const rawContent = await readFile(`/content/${fileName}`);

    const { data: frontmatter } = matter(rawContent);

    blogPosts.push({
      slug: fileName.replace(".mdx", ""),
      ...frontmatter,
    });
  }

  // @ts-ignore
  return blogPosts.sort((p1, p2) => (p1.publishedOn < p2.publishedOn ? 1 : -1));
}

export const loadBlogPost = React.cache(async (slug: string) => {
  const rawContent = await readFile(`/content/${slug}.mdx`);

  const { data: frontmatter, content } = matter(rawContent);

  return { frontmatter, content };
});

function readFile(localPath: string) {
  return fs.readFile(path.join(process.cwd(), localPath), "utf8");
}

function readDirectory(localPath: string) {
  return fs.readdir(path.join(process.cwd(), localPath));
}
