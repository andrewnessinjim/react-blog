import React from "react";

import BlogSummaryCard from "@/components/BlogSummaryCard";

import { getPublishedBlogPostList } from "@/helpers/file-helpers";
import { Heading, Wrapper } from "./page.styled";

async function Home() {
  const blogPostList = await getPublishedBlogPostList();

  return (
    <Wrapper>
      <Heading>Latest Content:</Heading>

      {blogPostList.map(({ slug, title, abstract, publishedOn }) => (
        <BlogSummaryCard
          key={slug}
          slug={slug}
          title={title}
          abstract={abstract}
          publishedOn={publishedOn}
        />
      ))}
    </Wrapper>
  );
}

export default Home;
