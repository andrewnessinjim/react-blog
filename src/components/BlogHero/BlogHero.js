import React from "react";
import { format } from "date-fns";

import {
  Content,
  Heading,
  PublishedContainer,
  PublishedTime,
  Wrapper,
} from "./BlogHero.styled";

function BlogHero({ title, publishedOn = new Date(), ...delegated }) {
  const humanizedDate = format(new Date(publishedOn), "MMMM do, yyyy");

  return (
    <Wrapper {...delegated}>
      <Content>
        <Heading>{title}</Heading>
        <PublishedContainer>
          Published on{" "}
          <PublishedTime dateTime={publishedOn}>{humanizedDate}</PublishedTime>
        </PublishedContainer>
      </Content>
    </Wrapper>
  );
}

export default BlogHero;
