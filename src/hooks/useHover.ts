import React, { useEffect } from "react";

export default function useHover<T extends HTMLElement>() {
  const [isHovered, setIsHovered] = React.useState(false);
  const hoverRef = React.useRef<T | null>(null);

  useEffect(() => {
    const onMouseEnter = () => setIsHovered(true);
    hoverRef?.current?.addEventListener("mouseenter", onMouseEnter);

    return () =>
      hoverRef?.current?.removeEventListener("mouseenter", onMouseEnter);
  }, [hoverRef]);

  useEffect(() => {
    const onMouseLeave = () => setIsHovered(false);
    hoverRef?.current?.addEventListener("mouseleave", onMouseLeave);

    return () =>
      hoverRef?.current?.removeEventListener("mouseleave", onMouseLeave);
  }, [hoverRef]);

  return [isHovered, hoverRef] as const;
}
