// 'use client';

import dynamic from "next/dynamic";

const LazyDivisionGroupsDemo = dynamic(() => import("./DivisionGroupsDemo"));
export default LazyDivisionGroupsDemo;
