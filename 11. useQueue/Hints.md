Hint #1 – first, last, size
Before you worry about the methods for managing the queue, first tackle the easier part – the first, last, and size properties.

Don't overthink this. It's just basic array fundamentals in JavaScript.

import * as React from "react";

const placeholder = () => {};

export default function useQueue(initialValue = []) {
  const [queue, setQueue] = React.useState(initialValue);

  const add = placeholder

  const remove = placeholder

  const clear = placeholder

  return {
    add,
    remove,
    clear,
    first: queue[0],
    last: queue[queue.length - 1],
    size: queue.length,
    queue
  };
}


Hint #2 – add
add simply takes in an element and adds it to the end of the queue.

const add = React.useCallback((element) => {
  setQueue((q) => [...q, element]);
}, []);
Also notice that we're wrapping add inside of useCallback. This is good practice so that any consumer of useQueue can pass add down via props if they'd like without invalidating their potential use of React.memo.



Hint #4 – clear
clear simply sets the queue to an empty array.

const clear = React.useCallback(() => {
  setQueue([]);
}, []);

Hint #3 – remove
Queue's are FIFO (first in, first out). This means that the first element added to the queue is the first element that should be removed. Therefore, inside of remove, we need to remove the first element from the queue and return it.

const remove = React.useCallback(() => {
  let removedElement;

  setQueue(([first, ...q]) => {
    removedElement = first;
    return q;
  });

  return removedElement;
}, []);