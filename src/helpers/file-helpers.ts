import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import React from "react";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getProjectFiles(
  projectSubDir: string
): Promise<{ [x: string]: string }> {
  const projectDir = "/sandpack-projects/" + projectSubDir;
  const fileNames = await readDirectory(projectDir);
  const filesContents: { [x: string]: string } = {};

  for (let fileName of fileNames) {
    const rawContent = await readFile(`${projectDir}/${fileName}`);
    filesContents[fileName] = rawContent;
  }

  return filesContents;
}

export async function getAllBlogPosts() {
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

export async function getPublishedBlogPosts() {
  console.log("getPublishedBlogPostList() - Accessing file system");
  const allPosts = await getAllBlogPosts();

  // @ts-ignore
  return allPosts.filter((post) => post.publishedOn !== undefined);
}

export const loadBlogPost = React.cache(async (slug: string) => {
  console.log("loadBlogPost() - Accessing file system");
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
