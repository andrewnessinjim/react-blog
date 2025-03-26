import { produce } from "immer";
import useMoveableIterables from "./useMoveableIterables";
import IterableItemPosition from "../IterableItemPosition";
import React from "react";
import { ItemStatus, IterableItemObject } from "../types";
import { useReducedMotion } from "framer-motion";

export interface ItemWithPosition {
  item: IterableItemObject;
  position: IterableItemPosition;
}

export function useZipLongIterables() {
  const {
    inputIterables,
    outputIterables,
    setInputIterables,
    setOutputIterables,
    longestIterableLength,
    moveFromInputToOutput: moveFromInputToOutputNoFill,
    updateInputItemStatus,
    upsertOutput,
    updateOutputItemStatus,
    ...rest
  } = useMoveableIterables();

  const [fillItems, setFillItems] = React.useState<ItemWithPosition[]>([]);

  const [fillValue, setFillValue] = React.useState("0");

  const reducedMotion = useReducedMotion() ?? false;

  function reset() {
    const nextInputIterables = produce(inputIterables, (draft) => {
      draft.forEach((iterable) => {
        iterable.items = iterable.items.filter((item) => item.value !== "");

        iterable.items.forEach((item) => {
          item.status = "not_started";
        });
      });
    });

    setInputIterables(nextInputIterables);
    setOutputIterables([]);
    setFillItems([]);
  }

  function markEmptyAndPendingItems() {
    const nextInputIterables = produce(inputIterables, (draft) => {
      draft.forEach((iterable) => {
        iterable.items.forEach((item) => {
          item.status = "pending";
        });

        while (iterable.items.length < longestIterableLength) {
          iterable.items.push({
            id: crypto.randomUUID(),
            value: "",
            animateEntry: false,
            status: "pending_empty",
          });
        }
      });
    });
    console.log("After marking empty and pending items", nextInputIterables);
    setInputIterables(nextInputIterables);
  }

  function moveFromInputToOutputTrackFill(
    currentPosition: IterableItemPosition
  ) {
    const movingItem =
      inputIterables[currentPosition.x].items[currentPosition.y];

    if (movingItem.value === "") {
      const nextFillItems = produce(fillItems, (draft) => {
        draft.push({
          item: {
            id: movingItem.id + "-fill",
            value: fillValue,
            status: "pending",
            animateEntry: false,
          },
          position: currentPosition,
        });
      });
      setFillItems(nextFillItems);
    }

    function nextInputStatus(currentStatus: ItemStatus): ItemStatus {
      switch (currentStatus) {
        case "pending_empty":
          return "transitioning_empty";
        case "pending":
          return "transitioning";
        case "transitioning":
          return "input_transitioned";
        case "transitioning_empty":
          return "transitioned_empty";
        default:
          return "transitioning";
      }
    }

    function nextOutputStatus(currentStatus: ItemStatus): ItemStatus {
      switch (currentStatus) {
        case "pending":
          return "output_transitioned";
        case "pending_empty":
          return "transitioned_fill_pending";
        default:
          return "output_transitioned";
      }
    }

    updateInputItemStatus(currentPosition, nextInputStatus(movingItem.status));

    const prevPosition = currentPosition.prevColWise(inputIterables.length);
    if (prevPosition) {
      const previousItem = inputIterables[prevPosition.x].items[prevPosition.y];
      updateInputItemStatus(prevPosition, nextInputStatus(previousItem.status));
    }

    upsertOutput(currentPosition.y, currentPosition.x, {
      ...movingItem,
      status: nextOutputStatus(movingItem.status),
      animateEntry: reducedMotion ? true : false,
    });
  }

  function fillOutputItem(itemWithPosition: ItemWithPosition) {
    const inputPosition = itemWithPosition.position;
    const outputPosition = new IterableItemPosition(
      inputPosition.y,
      inputPosition.x
    );

    upsertOutput(outputPosition.x, outputPosition.y, {
      ...outputIterables[outputPosition.x].items[outputPosition.y],
      fillValue: itemWithPosition.item.value,
      status: "transitioned_filled",
    });
  }

  function markTransitioningItemsAsTransitioned() {
    const nextInputIterables = produce(inputIterables, (draft) => {
      draft.forEach((iterable) => {
        iterable.items.forEach((item) => {
          if (item.status === "transitioning") {
            item.status = "input_transitioned";
          }
          if (item.status === "transitioning_empty") {
            item.status = "transitioned_empty";
          }
        });
      });
    });

    setInputIterables(nextInputIterables);
  }

  return {
    inputIterables,
    outputIterables,
    fillValue,
    setFillValue,
    fillItems,
    longestIterableLength,
    setInputIterables,
    markEmptyAndPendingItems,
    reset,
    moveFromInputToOutputTrackFill,
    fillOutputItem,
    markTransitioningItemsAsTransitioned,
    ...rest,
  };
}
