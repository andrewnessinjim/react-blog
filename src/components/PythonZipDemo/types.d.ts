export interface IterableItemObject {
  id: string;
  value: string;
  animateEntry: boolean;
  status:
    | "not_started"
    | "ignored"
    | "transitioned"
    | "pending"
    | "transitioning";
}

export type IterableObject = {
  id: string;
  animateEntry: boolean;
  items: IterableItemObject[];
  exiting: boolean;
};

export type AnimationStatus = "not_started" | "playing" | "paused" | "ended";

export type DemoStatus =
  | "editing"
  | "waiting"
  | "mark_shortest_iterable"
  | "mark_ignored_items"
  | "moving"
  | "resetting"
  | "viewing";
