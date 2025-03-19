import { produce } from "immer";
import React from "react";
import { IterableObject } from "./types";

const MIN_ITERABLES = 2;
const MAX_ITERABLES = 3;

const MIN_ITEMS = 1;
const MAX_ITEMS = 3;

type Action = {
  type:
    | "add_iterable"
    | "mark_last_iterable_for_exit"
    | "add_item"
    | "remove_item"
    | "update_item"
    | "drop_last_iterable";
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
              { value: "0", id: crypto.randomUUID(), animateEntry: true },
              { value: "0", id: crypto.randomUUID(), animateEntry: true },
              { value: "0", id: crypto.randomUUID(), animateEntry: true },
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
    }
  });
}

function initRandomIterable() {
  return {
    id: crypto.randomUUID(),
    animateEntry: false,
    exiting: false,
    items: [
      { id: crypto.randomUUID(), value: "1", animateEntry: false },
      { id: crypto.randomUUID(), value: "2", animateEntry: false },
      { id: crypto.randomUUID(), value: "3", animateEntry: false },
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

  function upsert(iterableIndex: number, itemIndex: number, value: string) {
    while (data.length <= iterableIndex) {
      addIterable();
    }
    while (data[iterableIndex].items.length <= itemIndex) {
      addItem(iterableIndex);
    }
    updateItem(iterableIndex, itemIndex, value);
  }

  return {
    data,
    addIterable,
    removeIterable,
    addItem,
    removeItem,
    updateItem,
    upsert,
  };
}
