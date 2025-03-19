export interface IterableItemObject {
  id: string;
  value: string;
  animateEntry: boolean;
}

export type IterableObject = {
  id: string;
  animateEntry: boolean;
  items: IterableItemObject[];
  exiting: boolean;
};
