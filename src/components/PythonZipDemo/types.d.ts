export interface IterableItemObject {
  id: string;
  value: string;
  animateEntry: boolean;
  crossedOut?: boolean;
  boop?: boolean;
  overlayDuplicate?: boolean;
}

export type IterableObject = {
  id: string;
  animateEntry: boolean;
  items: IterableItemObject[];
  exiting: boolean;
};

export type AnimationStatus = "editing" | "playing" | "viewing" | "paused";
