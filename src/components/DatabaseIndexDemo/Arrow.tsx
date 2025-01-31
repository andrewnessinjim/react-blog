import styled from "styled-components";
import { motion } from "framer-motion";

function MemoryReadArrow() {
  return (
    <Wrapper
      width="164px"
      height="32px"
      viewBox="0 0 185 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="index-arrow"
      initial={{
        scale: 0,
      }}
      style={{
        transformOrigin: "0% 50%",
      }}
    >
      <motion.path
        d="M0 16 H182 M173 6 L182 16 M173 26 L182 16"
        stroke="var(--color-gray-500)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Wrapper>
  );
}

const Wrapper = styled(motion.svg)`
  position: absolute;
  /* border: 1px dotted green; */
  left: 180px;
  top: 220px;
`;

export default MemoryReadArrow;
