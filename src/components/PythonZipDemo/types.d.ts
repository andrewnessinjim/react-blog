export interface IterableItemProps {
  id: string;
  value: string;
  animateEntry: boolean;
}

export type ZipIterableProps = {
  id: string;
  animateEntry: boolean;
  items: IterableItemProps[];
  exiting: boolean;
};
