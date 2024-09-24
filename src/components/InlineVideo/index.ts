import dynamic from "next/dynamic";

export * from "./InlineVideo";

const LazyInlineVideo = dynamic(() => import("./InlineVideo"));
export default LazyInlineVideo;
