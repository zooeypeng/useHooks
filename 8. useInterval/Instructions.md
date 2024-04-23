useInterval provides a convenient way to create and manage intervals in React. Using window.setInterval under the hood, useInterval repeatedly invokes a provided callback function at a specified interval and automatically clears the interval when the component using useInterval is removed from the DOM.

const clear = useInterval(callback, interval);
For the full documentation, see usehooks.com/useinterval.

TASKS
useInterval should accept a callback function and an interval integer as arguments
useInterval should invoke the callback function every interval milliseconds
useInterval should return a function that clears the interval
useInterval should clear the interval when the component using useInterval is removed from the DOM