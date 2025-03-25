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
    updateItemStatus: updateInputItemStatus,
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
    const movingItem = inputIterables[untilPosition.x].items[untilPosition.y];
    updateInputItemStatus(untilPosition, "transitioning");

    const prevPosition = untilPosition.prevColWise(inputIterables.length);
    if (prevPosition) {
      updateInputItemStatus(prevPosition, "transitioned");
    }

    upsertOutput(untilPosition.y, untilPosition.x, {
      ...movingItem,
      id: movingItem.id + "-out",
      status: "transitioned",
      //If motion is reduced, entry animation is used instead of movement animation
      animateEntry: reducedMotion ? true : false,
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
