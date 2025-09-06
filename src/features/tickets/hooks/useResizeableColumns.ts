import { useState } from "react";

export function useResizableColumns(initialWidths: number[]) {
  const [widths, setWidths] = useState(initialWidths);

  const startResize = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = widths[index];

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(60, startWidth + moveEvent.clientX - startX);
      setWidths((prev) =>
        prev.map((w, i) => (i === index ? newWidth : w))
      );
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return {
    widths,
    startResize,
  };
}