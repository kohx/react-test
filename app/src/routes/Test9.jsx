import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Draggable from "@/components/Draggable";
import Droppable from "@/components/Droppable";

export default () => {
  const containers = ["A", "B", "C"];
  const [parent, setParent] = useState(null);

  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  function handleDragEnd(event) {
    const { over } = event;

    // ドロップできる領域にドロップした時、親としてidをセット
    // それ以外はnullにする
    setParent(over ? over.id : null);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}

      {containers.map((id) => (
        // idを受け取ったらDroppableコンポーネントを更新
        // useDroppable にpropsを渡す
        <Droppable key={id} id={id}>
          {id}: {parent === id ? draggableMarkup : "Drop here"}
        </Droppable>
      ))}
    </DndContext>
  );
};
