import React from "react";
import { format } from "date-fns";

import {
  Arrow,
  ContinueReadingLink,
  PublishedTime,
  TextPreview,
  TitleLink,
  Wrapper,
} from "./BlogSummaryCard.styled";

function BlogSummaryCard({ slug, title, publishedOn, abstract }) {
  const href = `/${slug}`;
  const humanizedDate = format(new Date(publishedOn), "MMMM do, yyyy");

  return (
    <Wrapper>
      <TitleLink href={href}>{title}</TitleLink>
      <PublishedTime dateTime={publishedOn}>{humanizedDate}</PublishedTime>
      <TextPreview>
        {abstract}{" "}
        <ContinueReadingLink href={href}>
          Continue reading <Arrow>→</Arrow>
        </ContinueReadingLink>
      </TextPreview>
    </Wrapper>
  );
}

export default BlogSummaryCard;
