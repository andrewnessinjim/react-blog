"use client";

import * as React from "react";
import AnimationStepController from "../AnimationStepController";
import styled from "styled-components";
import IterableList from "../IterableList";
import { OutputIterables } from "../OutputIterables";
import { OutputLogs } from "./OutputLogs";
import { InputIterablesCode } from "./PythonIOCode";
import { OutputPrintedValueCode } from "./PythonIOCode";
import LayoutManager from "../LayoutManager";
import IterableItemPosition from "../IterableItemPosition";
import { motion, useReducedMotion } from "framer-motion";
import FillCell from "./FillCell";
import { ZipLongDemoStatus } from "./types";
import {
  ItemWithPosition,
  useZipLongIterables,
} from "../hooks/useZipLongIterables";
import { produce } from "immer";
import { MEDIA_QUERIES } from "@/constants";

const INIT_CURRENT_ITEM_POSITION = new IterableItemPosition(-1, 0);
function PythonZipLongDemo() {
  const {
    inputIterables,
    outputIterables,
    addInputIterable,
    removeInputIterable,
    addInputItem,
    removeInputItem,
    updateInputItem,
    reset: resetData,
    markEmptyAndPendingItems,
    markTransitioningItemsAsTransitioned,
    moveFromInputToOutputTrackFill,
    longestIterableIndex,
    longestIterableLength,
    fillValue,
    setFillValue,
    fillItems,
    fillOutputItem,
  } = useZipLongIterables();

  const [status, setStatus] = React.useState<ZipLongDemoStatus>("editing");
  const [currentItemPosition, setCurrentItemPosition] =
    React.useState<IterableItemPosition | null>(INIT_CURRENT_ITEM_POSITION);
  const [currentFillItemIndex, setCurrentFillItemIndex] = React.useState<
    number | null
  >(-1);

  const prefersReducedMotion = useReducedMotion() ?? false;
  const isMobile =
    window && window.matchMedia(MEDIA_QUERIES.phoneAndBelow).matches;

  function getNextItemPosition() {
    return (
      currentItemPosition?.nextColWise(
        inputIterables.length,
        longestIterableLength
      ) ?? null
    );
  }

  function getNextFillItemIndex() {
    if (
      currentFillItemIndex === null ||
      currentFillItemIndex + 1 >= fillItems.length
    ) {
      return null;
    }

    return currentFillItemIndex + 1;
  }

  function isDemoEnd() {
    return status === "viewing";
  }

  function reset() {
    const nextStatus = "editing";
    setStatus(nextStatus);

    const nextItemPos = INIT_CURRENT_ITEM_POSITION;
    setCurrentItemPosition(nextItemPos);

    setCurrentFillItemIndex(-1);

    resetData();
  }

  const isEditing = status === "editing";
  const isViewing = status === "viewing";

  const highlightLongestIterable = status === "mark_longest_iterable";

  const emptySlotsExists = inputIterables.some((iterable) =>
    iterable.items.some((item) => item.value === "")
  );

  function nextDemoStep() {
    const nextItemPos = getNextItemPosition();
    const nextFillItemIndex = getNextFillItemIndex();

    const statusFlow: Record<ZipLongDemoStatus, ZipLongDemoStatus> = {
      editing: "waiting",
      waiting: "mark_longest_iterable",
      mark_longest_iterable: "mark_empty_slots",
      mark_empty_slots: "moving",
      moving:
        nextItemPos !== null
          ? "moving"
          : prefersReducedMotion
          ? "resetting"
          : nextFillItemIndex != null
          ? "filling"
          : "viewing",
      resetting: nextFillItemIndex != null ? "filling" : "viewing",
      filling: nextFillItemIndex != null ? "filling" : "viewing",
      viewing: "viewing",
    };

    const nextStatus = statusFlow[status];
    setStatus(nextStatus);

    if (nextStatus === "mark_empty_slots") {
      markEmptyAndPendingItems();
    }

    if (nextStatus === "moving") {
      setCurrentItemPosition(nextItemPos);
      if (nextItemPos) moveFromInputToOutputTrackFill(nextItemPos);
    }
    if (nextStatus === "filling") {
      setCurrentFillItemIndex(nextFillItemIndex);
      if (nextFillItemIndex !== null) {
        fillOutputItem(fillItems[nextFillItemIndex]);
      }
    }

    if (nextStatus === "resetting") {
      markTransitioningItemsAsTransitioned();
    }
  }

  const inputBoardTitle = isEditing
    ? "Configure Input Iterables:"
    : "Input Iterables:";
  const inputBoard = (
    <InputBoard layout="position">
      <IterableList
        key={"input"}
        title={inputBoardTitle}
        iterables={inputIterables}
        addItem={addInputItem}
        removeItem={removeInputItem}
        updateItem={updateInputItem}
        allowMutation={isEditing}
        highlightIndex={
          highlightLongestIterable ? longestIterableIndex : undefined
        }
        onEdit={reset}
        addInputIterable={addInputIterable}
        removeInputIterable={removeInputIterable}
      />
    </InputBoard>
  );

  const outputLogs = !isEditing && (
    <OutputLogs
      status={status}
      emptySlotsExists={emptySlotsExists}
      maxIterableLength={longestIterableLength}
    />
  );

  const filledOutputIterables = produce(outputIterables, (draft) => {
    draft.forEach((iterable) => {
      iterable.items.forEach((item) => {
        if (item.status === "transitioned_filled" && item.fillValue) {
          item.value = item.fillValue;
        }
      });
    });
  });

  const outputBoard = !isEditing && (
    <OutputBoard>
      <OutputIterables outputIterables={outputIterables} />
    </OutputBoard>
  );

  const inputCode = (
    <InputIterablesCode
      inputIterables={inputIterables}
      fillValue={fillValue}
      collapsed={isMobile && !isEditing}
    />
  );

  const outputPrintedValue = isViewing && (
    <OutputPrintedValueCode outputIterables={filledOutputIterables} />
  );

  let slicedFillItems: ItemWithPosition[] = [];
  if (currentFillItemIndex !== null && currentFillItemIndex >= -1)
    slicedFillItems = fillItems.slice(currentFillItemIndex + 1);

  return (
    <Wrapper>
      <LayoutManager
        extras={
          <FillCell
            value={fillValue}
            setValue={setFillValue}
            fillItemWithPositions={slicedFillItems}
            isFilling={status === "filling"}
            allowMutation={isEditing}
          />
        }
        inputBoard={inputBoard}
        outputLogs={outputLogs}
        outputBoard={outputBoard}
        inputCode={inputCode}
        outputPrintedValue={outputPrintedValue}
        animationControls={
          <AnimationStepController
            stepsEnded={isDemoEnd}
            onReset={reset}
            onNextStep={nextDemoStep}
          />
        }
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputBoard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1.5;
  width: 272px;
`;

const OutputBoard = styled.div``;

export default PythonZipLongDemo;
