useLocalStorage gives you a convenient interface for storing and retrieving data from local storage in a React application. Its API is similar to useState, but it stores the value in localState instead of component state.

const [state, setState] = useLocalStorage(key, initialValue);
For the full documentation, see usehooks.com/uselocalstorage.

TASKS
useLocalStorage should return an array with two items, the local storage value at key and a function to update that value
useLocalStorage should subscribe to storage events and update the value in localStorage at key when the value changes
useLocalStorage should set the value in localStorage at key to initialValue if there's not a value in localStorage at key and initialValue is defined
useLocalStorage should update the value in localStorage at key with the value passed to setState
useLocalStorage should support an updater function similar to useState
useLocalStorage should clean up its storage event listener when the component using useLocalStorage is removed from the DOM