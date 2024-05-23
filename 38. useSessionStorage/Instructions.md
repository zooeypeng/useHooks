useSessionStorage gives you a convenient interface for storing and retrieving data from session storage in a React application. Its API is similar to useState, but it stores the value in sessionStorage instead of component state.

const [state, setState] = useSessionStorage(key, initialValue);
For the full documentation, see usehooks.com/usesessionstorage.

TASKS
useSessionStorage should return an array with two items, the sessionStorage value at key and a function to update that value
useSessionStorage should subscribe to storage events and update the value in sessionStorage at key when the value changes
useSessionStorage should set the value in sessionStorage at key to initialValue if there's not a value in sessionStorage at key and initialValue is defined
useSessionStorage should update the value in sessionStorage at key with the value passed to setState
useSessionStorage should support an updater function similar to useState
useSessionStorage should clean up its storage event listener when the component using useSessionStorage is removed from the DOM