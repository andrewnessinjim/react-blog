import { range } from "lodash-es";
import { PythonCode } from "../PythonCode";
import { IterableObject } from "../types";

interface Props {
  inputIterables: IterableObject[];
  fillValue: string;
}

export function InputIterablesCode({ inputIterables, fillValue }: Props) {
  const pythonCode = "from itertools import(\nzip_longest)\n\n"
    .concat(
      inputIterables
        .map((iterable, itertableIndex) => {
          return `iterable${itertableIndex} = [${iterable.items
            .filter((item) => item.value !== "")
            .map((item) => item.value)
            .join(", ")}]`;
        })
        .join("\n")
    )
    .concat("\n\n")
    .concat("zipped = zip_longest(\n")
    .concat(
      range(inputIterables.length)
        .map((i) => `    iterable${i}`)
        .join(",\n")
    )
    .concat(",\n    fillvalue=")
    .concat(fillValue)
    .concat("\n)\n")
    .concat("print(list(zipped))\n");

  return <PythonCode title="Code Representation" pythonCode={pythonCode} />;
}

export function OutputPrintedValueCode({
  outputIterables,
}: {
  outputIterables: IterableObject[];
}) {
  const pythonCode = ""
    .concat("[\n")
    .concat(
      outputIterables
        .map((iterable) => {
          return "    ("
            .concat(iterable.items.map((item) => item.value).join(", "))
            .concat(")");
        })
        .join(",\n")
    )
    .concat("\n")
    .concat("]\n");
  return (
    <PythonCode
      title="Printed Value"
      pythonCode={pythonCode}
      animateEntry={true}
    />
  );
}
