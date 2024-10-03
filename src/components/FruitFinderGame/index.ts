import dynamic from "next/dynamic";

export * from "./FruitFinderGame";

const LazyFruitFinder = dynamic(() => import("./FruitFinderGame"));
export default LazyFruitFinder;
