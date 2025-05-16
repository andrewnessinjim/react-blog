import dynamic from "next/dynamic";

export * from "./CitedQuote";

const LazyCitedQuote = dynamic(() => import("./CitedQuote"));
export default LazyCitedQuote;
