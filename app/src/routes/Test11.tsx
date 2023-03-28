import React, { useState } from "react";
import Tree from "../components/Tree";
import { getItems } from '../lib/functionFor11';
import type { TreeItems } from "../components/Tree/types";

// dummy data received by props
const defaultIdList: TreeItems = [
  {
    id: "test1",
    children: [],
  },
  {
    id: "test2",
    children: [
      { id: "test3", children: [] },
      { id: "test4", children: [] },
      { id: "test5", children: [] },
      { id: "test6", children: [] },
    ],
  },
  {
    id: "test7",
    children: [],
  },
  {
    id: "test8",
    children: [
      { id: "test9", children: [] },
      { id: "test10", children: [] },
    ],
  },
];

export default () => {

  // dummy data received by props
  const [items, setItems] = useState(() => defaultIdList);

  return (
    <div>
      <button onClick={() => getItems(items)}>
        get item from parent
      </button>

      <Tree items={items} setItems={setItems} />
    </div>
  );
};
