import IterableItemPosition from "./IterableItemPosition";
import useIterablesData from "./useIterablesData";
import { produce } from "immer";

export default function useInputAndOutputIterables() {
  const {
    data: inputIterables,
    setData: setInputIterables,
    shortestIterableIndex,
    shortestIterableLength,
    addIterable: addInputIterable,
    removeIterable: removeInputIterable,
    addItem: addInputItem,
    removeItem: removeInputItem,
    updateItem: updateInputItem,
  } = useIterablesData(true);
  const {
    data: outputIterables,
    upsert: upsertOutput,
    setData: setOutputIterables,
  } = useIterablesData(false);

  function reset() {
    const nextInputIterables = produce(inputIterables, (draft) => {
      draft.forEach((iterable) => {
        iterable.items.forEach((item) => {
          item.status = "not_started";
        });
      });
    });

    setInputIterables(nextInputIterables);
    setOutputIterables([]);
  }

  function moveFromInputToOutput(
    untilPosition: IterableItemPosition,
    markIgnoredItems: boolean = false
  ) {
    const nextInputIterables = produce(inputIterables, (draft) => {
      draft.forEach((iterable, iterableIndex) =>
        iterable.items.forEach((item, itemIndex) => {
          const itemPosition = new IterableItemPosition(
            iterableIndex,
            itemIndex
          );

          const isTransitioning = itemPosition.isEqual(untilPosition);
          const isTransitioned = itemPosition.isBefore(untilPosition);
          const isIgnored =
            markIgnoredItems && itemIndex >= shortestIterableLength;

          item.status = isIgnored
            ? "ignored"
            : isTransitioning
            ? "transitioning"
            : isTransitioned
            ? "transitioned"
            : "pending";
        })
      );
    });
    setInputIterables(nextInputIterables);

    nextInputIterables.forEach((iterable, iterableIndex) => {
      iterable.items
        .slice(0, shortestIterableLength)
        .forEach((item, itemIndex) => {
          if (
            item.status === "transitioned" ||
            item.status === "transitioning"
          ) {
            upsertOutput(itemIndex, iterableIndex, {
              ...item,
              id: item.id + "-out",
              status: "transitioned",
              animateEntry: false,
            });
          }
        });
    });
  }

  return {
    inputIterables,
    outputIterables,
    shortestIterableLength,
    addInputIterable,
    removeInputIterable,
    addInputItem,
    removeInputItem,
    updateInputItem,
    resetInputAndOutput: reset,
    shortestIterableIndex,
    moveFromInputToOutput,
  };
}
