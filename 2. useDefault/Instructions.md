The useDefault hook behaves similar to useState but with one difference – if the state of the hook is undefined or null, useDefault will default the state back to a provided default value.

const [state, setState] = useDefault(initialValue, defaultValue);
For the full documentation, see usehooks.com/usedefault.

TASKS
useDefault should return an array
On the initial render, the state that useDefault returns should be the same as the initialValue given to useDefault when it was invoked
When invoked, useDefault's updater function should update its state to the value passed to the updater function
If useDefault's state becomes undefined, the state that useDefault returns should be the defaultValue given to useDefault when it was invoked
If useDefault's state becomes null, the state that useDefault returns should be the defaultValue given to useDefault when it was invoked