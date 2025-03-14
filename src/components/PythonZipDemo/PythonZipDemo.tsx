"use client";

import * as React from "react";
import styled from "styled-components";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import useZipInputParams from "./useZipInputParams";
import Button from "../Button";
import PythonCode from "./PythonCode";
import ZipIterable from "./ZipIterable";

function PythonZipDemo() {
  const {
    inputIterables,
    addIterable,
    removeIterable,
    addItem,
    removeItem,
    updateItem,
  } = useZipInputParams();

  return (
    <LayoutGroup>
      <Wrapper>
        <DrawingBoard>
          <AnimatePresence>
            {inputIterables.map((iterable, iterableIndex) => {
              return (
                <ZipIterable
                  key={iterable.id}
                  iterable={iterable}
                  iterableIndex={iterableIndex}
                  addItem={addItem}
                  removeItem={removeItem}
                  updateItem={updateItem}
                />
              );
            })}
          </AnimatePresence>
          <IterableControls layout={true}>
            <Button variant="secondary" size="regular" onClick={addIterable}>
              Add Iterable
            </Button>
            <Button variant="secondary" size="regular" onClick={removeIterable}>
              Remove Iterable
            </Button>
          </IterableControls>
        </DrawingBoard>
        <PythonCode inputIterables={inputIterables} />
        <ZippedOutput />
      </Wrapper>
    </LayoutGroup>
  );
}

const Wrapper = styled.div`
  --gap: 10px;
  display: flex;
  gap: var(--gap);
  border: 1px dotted white;
  padding: 16px;
  min-height: 480px;
`;

const DrawingBoard = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  max-width: fit-content;
  flex: 1;
  min-width: 300px;
`;

const ZippedOutput = styled.div`
  flex: 1;
`;

const IterableControls = styled(motion.div)`
  display: flex;
  gap: var(--gap);
  align-self: center;
`;

export default PythonZipDemo;
