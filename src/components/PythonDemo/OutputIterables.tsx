import IterableList from "./IterableList";
import { IterableObject } from "./types";

interface Props {
  outputIterables: IterableObject[];
}

export function OutputIterables({ outputIterables }: Props) {
  return (
    <IterableList
      iterables={outputIterables}
      allowMutation={false}
      title="Output Iterables:"
    />
  );
}
