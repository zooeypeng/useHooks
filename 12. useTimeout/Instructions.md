useTimeout provides a convenient way to create and manage timeouts in React. Using window.setTimeout under the hood, useTimeout invokes a provided callback function after ms milliseconds and automatically clears the timeout when the component using useTimeout is removed from the DOM.

const clear = useTimeout(callback, ms);
For the full documentation, see usehooks.com/usetimeout.

TASKS
useTimeout should invoke the provided callback function after ms milliseconds
useTimeout should reset the timeout when the ms prop changes
useTimeout should return a function that clears the timeout
useTimeout should clear the timeout when the component using useTimeout is removed from the DOM