import { produce } from "immer";
import React from "react";
import { ZipIterableProps } from "./types";

const MIN_ITERABLES = 2;
const MAX_ITERABLES = 3;

const MIN_ITEMS = 1;
const MAX_ITEMS = 3;

type Action = {
  type:
    | "add_iterable"
    | "remove_iterable"
    | "add_item"
    | "remove_item"
    | "update_item";
  payload?: any;
};

function reducer(state: ZipIterableProps[], action: Action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "add_item": {
        const { paramIndex } = action.payload;
        if (draft[paramIndex].items.length < MAX_ITEMS) {
          draft[paramIndex].items.push({
            value: "0",
            id: action.payload.id,
            animateEntry: true,
          });
        }
        break;
      }

      case "update_item": {
        const { paramIndex, itemIndex, value } = action.payload;
        draft[paramIndex].items[itemIndex].value = value;
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
            items: [
              { value: "0", id: crypto.randomUUID(), animateEntry: true },
              { value: "0", id: crypto.randomUUID(), animateEntry: true },
              { value: "0", id: crypto.randomUUID(), animateEntry: true },
            ],
          });
        }
        break;
      }

      case "remove_iterable": {
        if (draft.length > MIN_ITERABLES) {
          draft.pop();
        }
        break;
      }
    }
  });
}
export default function useZipInputParams() {
  const [inputIterables, dispatch] = React.useReducer(reducer, [
    {
      id: crypto.randomUUID(),
      animateEntry: false,
      items: [
        { id: crypto.randomUUID(), value: "1", animateEntry: false },
        { id: crypto.randomUUID(), value: "2", animateEntry: false },
        { id: crypto.randomUUID(), value: "3", animateEntry: false },
      ],
    },
    {
      id: crypto.randomUUID(),
      animateEntry: false,
      items: [
        { id: crypto.randomUUID(), value: "32", animateEntry: false },
        { id: crypto.randomUUID(), value: "34", animateEntry: false },
        { id: crypto.randomUUID(), value: "35", animateEntry: false },
      ],
    },
  ]);

  function addIterable() {
    dispatch({
      type: "add_iterable",
    });
  }

  function removeIterable() {
    dispatch({
      type: "remove_iterable",
    });
  }

  function addItem(paramIndex: number) {
    dispatch({
      type: "add_item",
      payload: {
        paramIndex,
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

  function updateItem(paramIndex: number, itemIndex: number, value: string) {
    let sanitizedValue = value.replace(/^0+/, "");
    if (parseInt(sanitizedValue) > 99) {
      sanitizedValue = "99";
    }
    dispatch({
      type: "update_item",
      payload: {
        paramIndex,
        itemIndex,
        value: sanitizedValue === "" ? "0" : sanitizedValue,
      },
    });
  }

  return {
    inputIterables,
    addIterable,
    removeIterable,
    addItem,
    removeItem,
    updateItem,
  };
}
