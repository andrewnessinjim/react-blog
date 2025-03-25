import { useReducedMotion } from "framer-motion";
import IterableItemPosition from "./IterableItemPosition";
import { IterableObject } from "./types";
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

  const reducedMotion = useReducedMotion() ?? false;

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

  function markIgnoredAndPendingItems() {
    const nextInputIterables = produce(inputIterables, (draft) => {
      draft.forEach((iterable) =>
        iterable.items.forEach((item, itemIndex) => {
          const isIgnored = itemIndex >= shortestIterableLength;
          item.status = isIgnored ? "ignored" : "pending";
        })
      );
    });
    setInputIterables(nextInputIterables);
  }

  function markAllUnignoredItemsAsTransitioned() {
    const nextInputIterables = produce(inputIterables, (draft) => {
      draft.forEach((iterable) =>
        iterable.items.forEach((item) => {
          item.status = item.status === "ignored" ? "ignored" : "transitioned";
        })
      );
    });
    setInputIterables(nextInputIterables);
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
              //If motion is reduced, entry animation is used instead of movement animation
              animateEntry: reducedMotion ? true : false,
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
    markIgnoredAndPendingItems,
    markAllUnignoredItemsAsTransitioned,
  };
}
