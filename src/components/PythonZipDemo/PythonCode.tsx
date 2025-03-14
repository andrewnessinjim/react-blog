import styled from "styled-components";

import Button from "../Button";
import { range } from "lodash-es";

interface Props {
  inputIterables: { id: string; items: { id: string; value: string }[] }[];
}

function PythonCode({ inputIterables }: Props) {
  return (
    <Wrapper>
      <CodeBlock>
        {inputIterables.map((iterable, itertableIndex) => {
          return `iterable${itertableIndex} = [${iterable.items
            .map((item) => item.value)
            .join(", ")}]\n`;
        })}
        zipped = zip({"\n  "}
        {range(inputIterables.length)
          .map((i) => `iterable${i}`)
          .join(", \n  ")}
        {"\n"})
      </CodeBlock>
      <Button variant="primary" size="regular">
        print(list(zipped))
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const CodeBlock = styled.pre`
  min-width: 207px;
  font-size: 1.05rem;
  width: max-content;
  margin-inline-start: auto;
  margin-inline-end: auto;
`;

export default PythonCode;
