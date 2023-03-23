import React from "react";
import { useDroppable } from "@dnd-kit/core";

export default (props: any) => {

  // ドロップ可能にしたい領域のDOM要素に対して、ref を渡す
  //   全てのドロップ可能なコンポーネントで一意になるように、ユニークID(droppable)を振る
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    color: isOver ? "green" : undefined,
    border: "solid 1px gray",
    margin: "4px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};
