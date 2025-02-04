import { Transition } from "framer-motion";

export const personTrans: Transition = {
  type: "spring",
  damping: 15,
  stiffness: 150,
};

export const arrowNoBounceTrans: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.5,
};

export const arrowBounceTrans: Transition = {
  type: "spring",
  bounce: 0.5,
  duration: 1,
};

export const labelTrans: Transition = {
  type: "spring",
  bounce: 0.4,
  duration: 0.75,
};
