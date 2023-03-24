import React, { useState } from "react";
import Tree from "../components/Tree";
import type { TreeItems } from "../components/Tree/types";
import type { UniqueIdentifier } from "@dnd-kit/core";

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

interface Props {
  defaultIdList: responseItem;
}

type responseItem = {
  id: UniqueIdentifier;
  children?: responseItem[];
  collapsed?: boolean;
  order?: number;
  depth?: number;
  parent?: string | null;
};

// export default (items: responseItem, setItems: React.Dispatch<React.SetStateAction<TreeItems>>) => {
export default () => {
  const [items, setItems] = useState(() => defaultIdList);
  console.log(items);

  const getItems = () => {
    let depth = 0;
    let responseItems: responseItem[] = [];

    const recursion = (items: responseItem[]): void => {
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
          recursion(children);
        }
      }
    };
    recursion(items);

    let order = 0;
    const orders = (items: TreeItems): void => {
      if (items.length > 0) {
        for (const item of items) {
          order++;
          // console.log(`${item.id} : ${order}`);
          const target = responseItems.find(
            (responseItem) => item.id === responseItem.id
          );
          if (target) target.order = order;
          orders(item.children);
        }
      }
    };
    orders(items);

    responseItems.sort((a, b) => {
      if (a.order && b.order) {
        if (a.order < b.order) return -1;
        if (a.order > b.order) return 1;
      }
      return 0;
    });

    console.log(responseItems);
  };

  return (
    <>
      <button onClick={() => getItems()}>get item from parent</button>

      <Tree items={items} setItems={setItems} />
    </>
  );
};
