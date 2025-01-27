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
        <Heading
          initial={{
            opacity: 0,
            y: -200,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 15
          }}
        >
          {title}
        </Heading>
        <PublishedContainer>
          Published on{" "}
          <PublishedTime dateTime={publishedOn}>{humanizedDate}</PublishedTime>
        </PublishedContainer>
      </Content>
    </Wrapper>
  );
}

export default BlogHero;
