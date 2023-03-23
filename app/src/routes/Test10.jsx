import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "@/components/SortableItem";

export default () => {
  const [items, setItems] = useState([
    { id: 1, text: "aaa" },
    { id: 2, text: "bbb" },
    { id: 3, text: "ccc" },
    { id: 4, text: "eee" },
    { id: 5, text: "fff" },
  ]);

  const [idList, setIdList] = useState(Object.keys(items));

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setIdList((idList) => {
        const oldIndex = idList.indexOf(active.id);
        const newIndex = idList.indexOf(over.id);
        return arrayMove(idList, oldIndex, newIndex);
      });
    }
  };

  const change = () => {
    let temp = []
    for (const id of idList) {
      temp = [...temp, items[id]]
    }
    
    console.log(temp);
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={idList} strategy={verticalListSortingStrategy}>
          {idList.map((index) => (
            <SortableItem key={index} id={index} body={items[index]} />
          ))}
        </SortableContext>
      </DndContext>
      <button type="button" onClick={() => change()}>change</button>
    </>
  );
};
