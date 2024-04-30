import * as React from "react";

export default function useQueue(initialValue = []) {
  const [queue, setQueue] = React.useState(initialValue);

  const add = React.useCallback((newElement) => {
    setQueue((q) => [...q, newElement]);
  }, []);

  const remove = React.useCallback(() => {
    let removedItem;

    setQueue(([firstItem, ...restItems]) => {
      removedItem = firstItem;
      return restItems;
    });

    return removedItem;
  }, []);

  const clear = React.useCallback(() => {
    setQueue([]);
  }, []);

  return {
    add,
    remove,
    clear,
    first: queue[0],
    last: queue[queue.length - 1],
    size: queue.length,
    queue,
  };
}
