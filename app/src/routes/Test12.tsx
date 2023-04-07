import React, { useState } from "react";
import Tree from "../components/Tree";
import type { TreeItem } from "../components/Tree/types";

// dummy data received by props
const codeList = [
  ["itemA", "1", "6"],
  ["itemB", "2", "5"],
  ["itemC", "3", "1"],
  ["itemD", "4", "2"],
  ["itemE", "5", ""],
  ["itemF", "6", "9"],
  ["itemG", "7", "4"],
  ["itemH", "8", "4"],
  ["itemI", "9", ""],
];

export default () => {
  // filter no title
  const list0 = codeList.filter((row) => row[0] !== "");

  // set detail
  const list1 = list0.map((row, index): TreeItem => {
    return {
      id: `${index + 1}: ${row[0]} --- [${row[1]}] <${row[2]}>`,
      children: [],
      index,
      title: row[0],
      parentKey: row[1],
      childKey: row[2],
      childrenItem: [],
    };
  });

  // create tree
  const list2 = list1.filter((row) => {
    const childKey = row.childKey;
    // has parent then 
    if (childKey !== "") {
      // get parent by child key
      const parent = list1.find((row) => row.parentKey === childKey);

      // push child to parent
      parent?.children.push({
        id: row.id,
        children: row.children,
      });

      // not return to list2
      return false;
    }
    // has not parent then return list2
    else {
      return true;
    }
  });

  const [items, setItems] = useState(() => list2);
  console.log(items);
  

  return (
    <>
      <Tree items={items} setItems={setItems} />
    </>
  );
};
