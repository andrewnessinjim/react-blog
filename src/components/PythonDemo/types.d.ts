type InputItemStatus =
  | "not_started"
  | "ignored"
  | "pending_empty"
  | "transitioned_empty"
  | "transitioning_empty"
  | "pending"
  | "transitioning"
  | "input_transitioned";

type OutputItemStatus =
  | "transitioned_fill_pending"
  | "transitioned_filled"
  | "output_transitioned";

export type ItemStatus = InputItemStatus | OutputItemStatus;

export interface IterableItemObject {
  id: string;
  value: string | null;
  animateEntry: boolean;
  status: ItemStatus;
  fillValue?: string | null;
}

export type IterableObject = {
  id: string;
  animateEntry: boolean;
  items: IterableItemObject[];
  exiting: boolean;
};

export type AnimationStatus = "not_started" | "playing" | "paused" | "ended";

export type ZipDemoStatus =
  | "editing"
  | "waiting"
  | "mark_shortest_iterable"
  | "mark_ignored_items"
  | "moving"
  | "resetting"
  | "viewing";
