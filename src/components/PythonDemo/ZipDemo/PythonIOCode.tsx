import { range } from "lodash-es";
import { IterableObject } from "../types";
import { PythonCode } from "../PythonCode";

interface Props {
  inputIterables: IterableObject[];
  collapsed?: boolean;
}

export function InputIterablesCode({
  inputIterables,
  collapsed = false,
}: Props) {
  const pythonCode = inputIterables
    .map((iterable, itertableIndex) => {
      return `iterable${itertableIndex} = [${iterable.items
        .map((item) => item.value)
        .join(", ")}]`;
    })
    .join("\n")
    .concat("\nzipped = zip(\n")
    .concat(
      range(inputIterables.length)
        .map((i) => `    iterable${i}`)
        .join(",\n")
    )
    .concat("\n)\n")
    .concat("print(list(zipped))\n");

  return (
    <PythonCode
      title="Code Representation"
      pythonCode={pythonCode}
      collapsed={collapsed}
    />
  );
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
      title="Output"
      pythonCode={pythonCode}
      animateEntry={true}
    />
  );
}
