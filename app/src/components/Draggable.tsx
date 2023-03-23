import React from "react";
import { useDraggable } from "@dnd-kit/core";

export default (props: any) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });

  const defaultStyle = {
    margin: "4px",
    backgroundColor: "aquamarine"
  };

  const transformStyle = {
    transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
  };

  const style = transform ? {...defaultStyle, ...transformStyle} : defaultStyle
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
};
