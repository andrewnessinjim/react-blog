import { useReducedMotion } from "framer-motion";
import IterableItemPosition from "../IterableItemPosition";
import useIterables from "./useIterables";

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
    ...rest
  } = useIterables(true);
  const {
    data: outputIterables,
    upsert: upsertOutput,
    setData: setOutputIterables,
    updateItemStatus: updateOutputItemStatus,
  } = useIterables(false);

  const reducedMotion = useReducedMotion() ?? false;

  function moveFromInputToOutput(untilPosition: IterableItemPosition) {
    const movingItem = inputIterables[untilPosition.x].items[untilPosition.y];
    updateInputItemStatus(untilPosition, "transitioning");

    const prevPosition = untilPosition.prevColWise(inputIterables.length);
    if (prevPosition) {
      updateInputItemStatus(prevPosition, "input_transitioned");
    }

    upsertOutput(untilPosition.y, untilPosition.x, {
      ...movingItem,
      status: "output_transitioned",
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
    setOutputIterables,
    moveFromInputToOutput,
    updateInputItemStatus,
    upsertOutput,
    updateOutputItemStatus,
    ...rest,
  };
}
