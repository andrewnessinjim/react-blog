"use client";

import { MEDIA_QUERIES } from "@/constants";
import styled from "styled-components";

type Axis = "horizontal" | "vertical";
interface Props {
  axis?: Axis;
  size: number;
  when?: {
    laptopAndBelow?: number;
    tabletAndBelow?: number;
    phoneAndBelow?: number;
  };
}

function getHeight(size:number, axis?:Axis,  ) {
  return (axis === "horizontal" ? 1 : size)+"px";
}

function getWidth(size:number, axis?:Axis) {
  return (axis === "vertical" ? 1 : size)+"px";
}

function getResponsiveHeight(responsiveSize:number|undefined, axis?: Axis) {
  if(!responsiveSize) return undefined;
  return getHeight(responsiveSize, axis)
}

function getResponsiveWidth(responsiveSize:number|undefined, axis?: Axis) {
  if(!responsiveSize) return undefined;
  return getWidth(responsiveSize, axis)
}


const Spacer = styled("span")<Props>`
  display: block;
  --width: ${p => getWidth(p.size, p.axis)};
  --height: ${p => getHeight(p.size, p.axis)};

  @media ${MEDIA_QUERIES.laptopAndBelow} {
    --width: ${p => getResponsiveWidth(p.when?.laptopAndBelow, p.axis)};
    --height: ${p => getResponsiveHeight(p.when?.laptopAndBelow, p.axis)};
  }

  @media ${MEDIA_QUERIES.tabletAndBelow} {
    --width: ${p => getResponsiveWidth(p.when?.tabletAndBelow, p.axis)};
    --height: ${p => getResponsiveHeight(p.when?.tabletAndBelow, p.axis)};
  }

  @media ${MEDIA_QUERIES.phoneAndBelow} {
    --width: ${p => getResponsiveWidth(p.when?.phoneAndBelow, p.axis)};
    --height: ${p => getResponsiveHeight(p.when?.phoneAndBelow, p.axis)};
  }

  width: var(--width);
  min-width: var(--width);
  height: var(--height);
  min-height: var(--height);
`;

export default Spacer;
