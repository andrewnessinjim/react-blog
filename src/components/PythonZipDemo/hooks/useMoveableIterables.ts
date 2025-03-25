import { useReducedMotion } from "framer-motion";
import IterableItemPosition from "../IterableItemPosition";
import useIterables from "./useIterables";
import { produce } from "immer";

export default function useMoveableIterables() {
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
  } = useIterables(true);
  const {
    data: outputIterables,
    upsert: upsertOutput,
    setData: setOutputIterables,
  } = useIterables(false);

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

  function moveFromInputToOutput(untilPosition: IterableItemPosition) {
    const nextInputIterables = produce(inputIterables, (draft) => {
      draft.forEach((iterable, iterableIndex) =>
        iterable.items.forEach((item, itemIndex) => {
          const itemPosition = new IterableItemPosition(
            iterableIndex,
            itemIndex
          );

          const isTransitioning = itemPosition.isEqual(untilPosition);
          const isTransitioned = itemPosition.isBefore(untilPosition);

          if (isTransitioning) {
            item.status = "transitioning";
          } else if (isTransitioned) {
            item.status = "transitioned";
          }
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
    setInputIterables,
    outputIterables,
    shortestIterableLength,
    shortestIterableIndex,
    addInputIterable,
    removeInputIterable,
    addInputItem,
    removeInputItem,
    updateInputItem,
    reset,
    moveFromInputToOutput,
  };
}
