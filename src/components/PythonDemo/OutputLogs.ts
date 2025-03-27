import { MEDIA_QUERIES } from "@/constants";
import { motion } from "framer-motion";
import styled from "styled-components";

export const labelAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.35 },
};

export const valueAnimation = {
  initial: { scale: 3 },
  animate: { scale: 1 },
  transition: { duration: 0.5 },
};

export const OutputLogsWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;

  @media ${MEDIA_QUERIES.phoneAndBelow} {
    gap: 4px;
  }
`;

export const LogLabel = styled(motion.p)`
  font-size: 1rem;
  font-family: var(--font-family-mono);
  margin: 0;
`;

export const Length = styled(motion.strong)`
  display: inline-block;
  color: green;
`;
