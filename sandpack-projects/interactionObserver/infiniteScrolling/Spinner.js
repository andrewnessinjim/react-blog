import React from "react";
import { Loader } from "react-feather";

const Spinner = ({ color, size }) => {
  return (
    <div className="spinner">
      <Loader color={color} size={size} />
    </div>
  );
};

export default Spinner;
