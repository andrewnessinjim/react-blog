import React from "react";

import BlogSummaryCard from "@/components/BlogSummaryCard";

import { getAllBlogPosts, getPublishedBlogPosts } from "@/helpers/file-helpers";
import { Heading, Wrapper } from "./page.styled";

import {isProduction} from "../utils";

export const dynamic = "force-static";

async function Home() {
  const blogPostList = isProduction()
    ? await getPublishedBlogPosts()
    : await getAllBlogPosts();

  return (
    <Wrapper>
      <Heading>Latest Content:</Heading>

      {blogPostList.map(({ slug, title, abstract, publishedOn }) => (
        <BlogSummaryCard
          key={slug}
          slug={slug}
          title={title}
          abstract={abstract}
          publishedOn={publishedOn??new Date()}
        />
      ))}
    </Wrapper>
  );
}

export default Home;
