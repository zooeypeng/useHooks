useRandomInterval is useful for executing a specified callback function at random intervals within a specified range.

const clear = useRandomInterval(
  callback,
  { minDelay, maxDelay }
);
For the full documentation, see usehooks.com/userandominterval.

TASKS
useRandomInterval should return a function that the user can call to clear the timeout
useRandomInterval should call the callback function at random intervals between minDelay and maxDelay
useRandomInterval should clear the timeout when the component using useRandomInterval is removed from the DOM