import React from "react";

export default function useToggle(
  initialState: boolean
): [boolean, () => void] {
  const [on, setOn] = React.useState<boolean>(initialState);

  function toggle() {
    setOn(!on);
  }

  return [on, toggle];
}
