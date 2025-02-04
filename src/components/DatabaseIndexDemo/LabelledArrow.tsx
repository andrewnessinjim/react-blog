import styled from "styled-components";
import { motion } from "framer-motion";
import React from "react";

export const CLASS_TABLE_ARROW = "table-arrow";
export const CLASS_IDX_CHECK_ARROW = "idx-check-arrow";
export const CLASS_IDX_RETURN_ARROW = "idx-return-arrow";

export type ArrowType = "table_access" | "index_check" | "index_return";
interface Props {
  arrowType: ArrowType;
  label: React.ReactNode;
}

export const TYPE_MAP: Record<
  ArrowType,
  {
    arrowPath: string;
    arrowLeft: string;
    arrowTop: string;
    arrowHeight: string;
    arrowWidth: string;
    arrowViewbox: string;
    labelLeft: string;
    labelTop: string;
    transformOrigin: string;
    className: string;
  }
> = {
  table_access: {
    arrowPath: "M0 16 H182 M173 6 L182 16 M173 26 L182 16",
    arrowLeft: "180px",
    arrowTop: "220px",
    arrowWidth: "164px",
    arrowHeight: "32px",
    arrowViewbox: "0 0 185 32",
    labelLeft: "192px",
    labelTop: "208px",
    transformOrigin: "0% 50%",
    className: CLASS_TABLE_ARROW,
  },
  index_check: {
    arrowPath: "M16 132 V4 M6 13 L16 4 M26 13 L16 4 ",
    arrowLeft: "64px",
    arrowTop: "78px",
    arrowWidth: "32px",
    arrowHeight: "132px",
    arrowViewbox: "0 0 32 132",
    labelLeft: "20px",
    labelTop: "124px",
    transformOrigin: "50% 100%",
    className: CLASS_IDX_CHECK_ARROW,
  },
  index_return: {
    arrowPath: "M16 0 V126 M6 117 L16 126 M26 117 L16 126",
    arrowLeft: "92px",
    arrowTop: "78px",
    arrowWidth: "32px",
    arrowHeight: "132px",
    arrowViewbox: "0 0 32 132",
    labelLeft: "116px",
    labelTop: "136px",
    transformOrigin: "50% 0%",
    className: CLASS_IDX_RETURN_ARROW,
  },
};

function Arrow({ arrowType, label }: Props) {
  const arrowTypeMap = TYPE_MAP[arrowType];
  return (
    <>
      <Wrapper
        width={arrowTypeMap.arrowWidth}
        height={arrowTypeMap.arrowHeight}
        viewBox={arrowTypeMap.arrowViewbox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={arrowTypeMap.className}
        initial={{
          scale: 0,
        }}
        style={{
          transformOrigin: arrowTypeMap.transformOrigin,
          "--arrowLeft": arrowTypeMap.arrowLeft,
          "--arrowTop": arrowTypeMap.arrowTop,
        }}
      >
        <motion.path
          d={arrowTypeMap.arrowPath}
          stroke="var(--color-gray-500)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Wrapper>
      <Label
        initial={{
          scale: 0,
        }}
        className={arrowTypeMap.className}
        style={{
          transformOrigin: arrowTypeMap.transformOrigin,
          "--labelLeft": arrowTypeMap.labelLeft,
          "--labelTop": arrowTypeMap.labelTop,
        }}
      >
        {label}
      </Label>
    </>
  );
}

const Wrapper = styled(motion.svg)`
  position: absolute;
  left: var(--arrowLeft);
  top: var(--arrowTop);
`;

const Label = styled(motion.p)`
  position: absolute;
  font-size: 16px;
  left: var(--labelLeft);
  top: var(--labelTop);
`;

export default Arrow;
