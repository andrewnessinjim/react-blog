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

export type AnimationStatus = "editing" | "playing" | "viewing" | "paused";
