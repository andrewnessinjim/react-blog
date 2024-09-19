import { YPositions } from "./YPositionScroller";

export const VIEWPORT_WIDTH = 280;
export const VIEWPORT_HEIGHT = 180;
export const PAGE_WIDTH = VIEWPORT_WIDTH - 10;
export const PAGE_HEIGHT = VIEWPORT_HEIGHT * 2;

export const VIEW_BOX_WIDTH = 288;
export const VIEW_BOX_HEIGHT = 600;
export const VIEWPORT_X = 4;
export const VIEWPORT_Y = 210;
export const PAGE_X = VIEWPORT_X + 5;
export const INIT_PAGE_Y = VIEWPORT_Y + 4;
export const OBSERVED_ELEMENT_X = 114;
export const VIEWPORT_BOTTOM_Y = VIEWPORT_Y + VIEWPORT_HEIGHT;
export const OBSERVED_ELEM_OFFSET_FROM_BOTTOM = -64;

export const MAX_SCROLLBAR_VAL = 100;

export function yPositionsFromScrollPos(scrollPos:number):YPositions {
  const pageY = pageYFromScrollPos(scrollPos);
  return {
    pageY,
    observedElemY: observedElemYFromPageY(pageY)
  }
}

function pageYFromScrollPos(scrollPos: number) {
  return (
    INIT_PAGE_Y -
    (scrollPos / MAX_SCROLLBAR_VAL) * (PAGE_HEIGHT - VIEWPORT_HEIGHT + 8)
  );
}

function observedElemYFromPageY(pageY: number) {
  return pageY + PAGE_HEIGHT + OBSERVED_ELEM_OFFSET_FROM_BOTTOM;
}

function hasExitedViewport(
  prevObservedElemY: number,
  nextObservedElemY: number
) {
  return (
    VIEWPORT_BOTTOM_Y > prevObservedElemY &&
    VIEWPORT_BOTTOM_Y < nextObservedElemY
  );
}

function hasEnteredViewPort(
  prevObservedElemY: number,
  nextObservedElemY: number
) {
  return (
    VIEWPORT_BOTTOM_Y < prevObservedElemY &&
    VIEWPORT_BOTTOM_Y > nextObservedElemY
  );
}

export function hasEnteredOrExitedViewPort(
  prevObservedElemY: number,
  nextObservedElemY: number
) {
  return (
    hasEnteredViewPort(prevObservedElemY, nextObservedElemY) ||
    hasExitedViewport(prevObservedElemY, nextObservedElemY)
  );
}
