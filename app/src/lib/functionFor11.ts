import type { UniqueIdentifier } from "@dnd-kit/core";

// type response item
type ResponseItem = {
  id: UniqueIdentifier;
  code?: string;
  children?: ResponseItems;
  collapsed?: boolean;
  order?: number;
  depth?: number;
  parent?: string | null;
};

// type response items
type ResponseItems = ResponseItem[];

const getItems = (items: ResponseItems) => {
  // declare depth
  let depth = 0;

  // declare response items
  let responseItems: ResponseItem[] = [];

  // recursion function for get depth and parent
  const recursionDepthAndParent = (items: ResponseItems): void => {
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
  const recursionOrders = (items: ResponseItems): void => {
    if (items.length > 0) {
      for (const item of items) {
        order++;
        // console.log(`${item.id} : ${order}`);
        const target = responseItems.find(
          (responseItem) => item.id === responseItem.id
        );

        if (target) target.order = order;

        if (item.children) recursionOrders(item.children);
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

export { getItems, ResponseItem, ResponseItems };
