import dynamic from "next/dynamic";

export * from "./StorageMatrix";

const LazyStorageMatrix = dynamic(() => import("./StorageMatrix"));
export default LazyStorageMatrix;
