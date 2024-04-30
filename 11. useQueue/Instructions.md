useQueue gives you an easy way to manage a queue type data structure. If you're not familiar, a queue follows the FIFO (first in, first out) principle. This means that the first element added to the queue is the first element that should be removed.

const { add, remove, clear, first, last, size, queue } = useQueue(initialValue);
For the full documentation, see usehooks.com/usequeue.

TASKS
useQueue should accept an initialValue argument that will be used to initialize the queue.
useQueue should return an object with add, remove, clear, first, last, size, and queue properties
useQueue should implement an add method that adds an element to the end of the queue
useQueue should implement a remove method that removes the first element from the queue and returns it
useQueue should implement a clear method that sets the queue to an empty array
useQueue should implement a first property that returns the first element in the queue
useQueue should implement a last property that returns the last element in the queue
useQueue should implement a size property that returns the size of the queue