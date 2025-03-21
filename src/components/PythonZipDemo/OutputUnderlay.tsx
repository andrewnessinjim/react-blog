import { motion } from "framer-motion";
import styled from "styled-components";
import IterableList from "./IterableList";
import { IterableObject } from "./types";

interface Props {
  inputIterables: IterableObject[];
  animationStep: number;
}
function OutputUnderlay({ inputIterables, animationStep }: Props) {
  const outputIterablesUnderlay = inputIterables.map(
    (inputIterable: IterableObject, iterableIndex) => {
      function isMoved(itemIndex: number, iterableIndex: number) {
        return (
          animationStep - 3 >= itemIndex * inputIterables.length + iterableIndex
        );
      }

      return {
        id: inputIterable.id + "underlay",
        animateEntry: false,
        exiting: false,
        items: inputIterable.items.map((item, itemIndex) => {
          return {
            ...item,
            animateEntry: false,
            id: isMoved(itemIndex, iterableIndex)
              ? item.id + "-moved"
              : item.id + "-out",
          };
        }),
      };
    }
  );

  return (
    <Wrapper>
      <IterableList
        key={"output"}
        iterables={outputIterablesUnderlay}
        allowMutation={false}
      />
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)``;

export default OutputUnderlay;
