import React from "react";

import BlogHero from "@/components/BlogHero";

import { getAllBlogPosts, loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import COMPONENTS from "@/helpers/mdx-component";
import { Page, Wrapper } from "./page.styled";

import remarkGfm from 'remark-gfm';

export const dynamic = "force-static";

export async function generateMetadata({ params }) {
  const { frontmatter } = await loadBlogPost(params.postSlug);

  return {
    description: frontmatter.abstract,
    title: frontmatter.title,
  };
}
async function BlogPost({ params }) {
  const { frontmatter, content } = await loadBlogPost(params.postSlug);

  return (
    <Wrapper>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <Page>
        <MDXRemote source={content} components={COMPONENTS} options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm]
          }
        }} />
      </Page>
    </Wrapper>
  );
}

export async function generateStaticParams() {
  const blogPosts = await getAllBlogPosts();
  
  return blogPosts.map((blogPost) => ({
    postSlug: blogPost.slug,
  }));
}

export default BlogPost;
