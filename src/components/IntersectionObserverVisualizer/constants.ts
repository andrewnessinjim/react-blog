import { Transition } from "framer-motion";

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
export const OBSERVED_ELEM_OFFSET_FROM_BOTTOM = -118;

export const OBSERVED_ELEM_WIDTH = 60;
export const OBSERVED_ELEM_HEIGHT = 60;

export const MAX_SCROLLBAR_VAL = 100;

export const PAGE_TRANSITION: Transition = {
  type: "spring",
  damping: 30,
  stiffness: 200,
};
