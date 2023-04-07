import React, { useState } from "react";
import Tree from "../components/Tree";
import type { TreeItem } from "../components/Tree/types";

// dummy data received by props
const codeList = [
  ["itemA", "1", ""],
  ["itemB", "2", "5"],
  ["itemC", "3", "1"],
  ["itemD", "4", "2"],
  ["itemE", "5", ""],
  ["itemF", "6", ""],
];

export default () => {
  const list0 = codeList.filter((row) => row[0] !== "");
  const list1 = list0.map((row, index): TreeItem => {
    return {
      id: `${index}: ${row[0]}: ${row[1]}: ${row[2]}`,
      children: [],
      index,
      title: row[0],
      parentKey: row[1],
      childKey: row[2],
      childrenItem: [],
    };
  });

  const list2 = list1.filter((row) => {
    const child = row.childKey;
    if (child !== "") {
      const parent = list1.find((row) => row.parentKey === child);
      parent?.children.push({
        id: row.id,
        children: row.children,
      });
      return false;
    } else {
      return true;
    }
  });

  console.log(list2);
  const [items, setItems] = useState(() => list2);

  return (
    <>
      <Tree items={items} setItems={setItems} />
    </>
  );
};
