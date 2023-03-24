import React, { useState } from "react";
import Tree from "../components/Tree";
import type { TreeItems } from "../components/Tree/types";
import type { UniqueIdentifier } from "@dnd-kit/core";

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

// type response item
type responseItem = {
  id: UniqueIdentifier;
  children?: responseItem[];
  collapsed?: boolean;
  order?: number;
  depth?: number;
  parent?: string | null;
};

// type response items
type responseItems = responseItem[]

// type props
type Props = {
  defaultIdList: responseItems;
};

// export default (items: responseItems, setItems: React.Dispatch<React.SetStateAction<TreeItems>>) => {
export default () => {

  // dummy data received by props
  const [items, setItems] = useState(() => defaultIdList);
  console.log(items);

  // get item function
  const getItems = () => {

    // declare depth
    let depth = 0;

    // declare response items
    let responseItems: responseItem[] = [];

    // recursion function for get depth and parent
    const recursionDepthAndParent = (items: responseItem[]): void => {
      if (items.length > 0) {
        depth++;
        let children: any[] = [];
        for (const item of items) {
          order++;
          // console.log(`${item.id}, depth: ${depth}, parent: ${item.parent ?? null}`);
          responseItems = [
            ...responseItems,
            { id: item.id, depth, parent: item.parent ?? null },
          ];
          for (const child of item.children ?? []) {
            children = [...children, { ...child, parent: item.id }];
          }
        }
        // console.log(children);
        if (children.length > 0) {
          recursionDepthAndParent(children);
        }
      }
    };

    // do function
    recursionDepthAndParent(items);

    // declare order
    let order = 0;

    // recursion function for get order
    const recursionOrders = (items: TreeItems): void => {
      if (items.length > 0) {
        for (const item of items) {
          order++;
          // console.log(`${item.id} : ${order}`);
          const target = responseItems.find(
            (responseItem) => item.id === responseItem.id
          );
          if (target) target.order = order;
          recursionOrders(item.children);
        }
      }
    };

    // do function
    recursionOrders(items);

    // sort by order
    responseItems.sort((a, b) => {
      if (a.order && b.order) {
        if (a.order < b.order) return -1;
        if (a.order > b.order) return 1;
      }
      return 0;
    });

    console.log(responseItems);
  };

  // style for tree
  const styleTree = {
    border: "2px solid tomato",
    width: "90vw",
    marginInline: "auto",
  };

  // style for button
  const styleBnt = {
    margin: "10px",
  };

  return (
    <div style={styleTree}>
      <button style={styleBnt} onClick={() => getItems()}>
        get item from parent
      </button>

      <Tree items={items} setItems={setItems} />
    </div>
  );
};
