import { produce } from "immer";
import useMoveableIterables from "./useMoveableIterables";

function useZipIterables() {
  const { inputIterables, shortestIterableLength, setInputIterables, ...rest } =
    useMoveableIterables();

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
        iterable.items
          .filter((item) => item.status !== "ignored")
          .forEach((item) => {
            item.status = "transitioned";
          })
      );
    });
    setInputIterables(nextInputIterables);
  }

  return {
    ...rest,
    inputIterables,
    shortestIterableLength,
    markIgnoredAndPendingItems,
    markAllUnignoredItemsAsTransitioned,
  };
}

export default useZipIterables;
