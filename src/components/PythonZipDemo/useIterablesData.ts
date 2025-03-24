import { produce } from "immer";
import React from "react";
import { IterableItemObject, IterableObject } from "./types";

const MIN_ITERABLES = 2;
const MAX_ITERABLES = 3;

const MIN_ITEMS = 0;
const MAX_ITEMS = 3;

type Action = {
  type:
    | "add_iterable"
    | "mark_last_iterable_for_exit"
    | "add_item"
    | "remove_item"
    | "update_item"
    | "drop_last_iterable"
    | "set_data"
    | "upsert";
  payload?: any;
};

function reducer(state: IterableObject[], action: Action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "add_item": {
        const { iterableIndex } = action.payload;
        if (draft[iterableIndex].items.length < MAX_ITEMS) {
          draft[iterableIndex].items.push({
            value: "0",
            id: action.payload.id,
            animateEntry: true,
            status: "not_started",
          });
        }
        break;
      }

      case "update_item": {
        const { iterableIndex, itemIndex, value } = action.payload;
        draft[iterableIndex].items[itemIndex].value = value;
        break;
      }

      case "remove_item": {
        const { iterableIndex } = action.payload;
        if (draft[iterableIndex].items.length > MIN_ITEMS) {
          draft[iterableIndex].items.pop();
        }
        break;
      }

      case "add_iterable": {
        if (draft.length < MAX_ITERABLES) {
          draft.push({
            id: crypto.randomUUID(),
            animateEntry: true,
            exiting: false,
            items: [
              {
                value: "0",
                id: crypto.randomUUID(),
                animateEntry: false,
                status: "pending",
              },
              {
                value: "0",
                id: crypto.randomUUID(),
                animateEntry: false,
                status: "pending",
              },
              {
                value: "0",
                id: crypto.randomUUID(),
                animateEntry: false,
                status: "pending",
              },
            ],
          });
        }
        break;
      }

      case "mark_last_iterable_for_exit": {
        if (draft.length > MIN_ITERABLES) {
          draft[draft.length - 1].exiting = true;
        }
        break;
      }

      case "drop_last_iterable": {
        draft.pop();
        break;
      }

      case "set_data": {
        return action.payload;
      }

      case "upsert": {
        const { iterableIndex, itemIndex, item } = action.payload;

        while (draft.length <= iterableIndex) {
          draft.push({
            id: crypto.randomUUID(),
            animateEntry: false,
            exiting: false,
            items: [],
          });
        }

        draft[iterableIndex].items[itemIndex] = item;
        break;
      }
    }
  });
}

function initRandomIterable(): IterableObject {
  return {
    id: crypto.randomUUID(),
    animateEntry: false,
    exiting: false,
    items: [
      {
        id: crypto.randomUUID(),
        value: "1",
        animateEntry: false,
        status: "pending",
      },
      {
        id: crypto.randomUUID(),
        value: "2",
        animateEntry: false,
        status: "pending",
      },
      {
        id: crypto.randomUUID(),
        value: "3",
        animateEntry: false,
        status: "pending",
      },
    ],
  };
}

export default function useIterablesData(populated = false) {
  const [data, dispatch] = React.useReducer(
    reducer,
    populated ? [initRandomIterable(), initRandomIterable()] : []
  );

  React.useEffect(() => {
    if (data.length >= 1) {
      const lastIterable = data[data.length - 1];
      if (lastIterable.exiting) {
        dispatch({ type: "drop_last_iterable" });
      }
    }
  }, [data]);

  function addIterable() {
    dispatch({
      type: "add_iterable",
    });
  }

  function removeIterable() {
    dispatch({
      type: "mark_last_iterable_for_exit",
    });
  }

  function addItem(iterableIndex: number) {
    dispatch({
      type: "add_item",
      payload: {
        iterableIndex,
        id: crypto.randomUUID(),
      },
    });
  }

  function removeItem(iterableIndex: number) {
    dispatch({
      type: "remove_item",
      payload: { iterableIndex },
    });
  }

  function updateItem(iterableIndex: number, itemIndex: number, value: string) {
    let sanitizedValue = value.replace(/^0+/, "");
    if (parseInt(sanitizedValue) > 99) {
      sanitizedValue = "99";
    }
    dispatch({
      type: "update_item",
      payload: {
        iterableIndex,
        itemIndex,
        value: sanitizedValue === "" ? "0" : sanitizedValue,
      },
    });
  }

  function upsert(
    iterableIndex: number,
    itemIndex: number,
    item: IterableItemObject
  ) {
    dispatch({
      type: "upsert",
      payload: {
        iterableIndex,
        itemIndex,
        item,
      },
    });
  }

  function setData(newData: IterableObject[]) {
    dispatch({ type: "set_data", payload: newData });
  }

  const shortestIterableIndex = data.reduce(
    (smallestIndex, iterable, index) =>
      iterable.items.length < data[smallestIndex].items.length
        ? index
        : smallestIndex,
    0
  );

  const shortestIterableLength = data[shortestIterableIndex]
    ? data[shortestIterableIndex].items.length
    : 0;

  return {
    data,
    setData,
    shortestIterableIndex,
    shortestIterableLength,
    addIterable,
    removeIterable,
    addItem,
    removeItem,
    updateItem,
    upsert,
  };
}
