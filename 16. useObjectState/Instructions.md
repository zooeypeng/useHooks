useObjectState works similar to useState in that it returns an array with the first item being the state and the second being a way to update that state. However, unlike useState, the state that useObjectState manages is an object and it will merge the new state with the old state instead of replacing it.

const [state, setState] = useObjectState(initialState);
const [state, setState] = useObjectState({ name: "John", age: 30 });

setState({ name: "Jonathan" }); // { name: "Jonathan", age: 30 }
setState((s) => ({ age: s.age + 1 })); // { name: "Jonathan", age: 31 }
For the full documentation, see usehooks.com/useobjectstate.

TASKS
useObjectState should accept an initial value and return an array with the first item being the state and the second item being a way to update that state
useObjectState should accept an object and merge it with the current state
useObjectState should support an updater function similar to useState
useObjectState should ignore updating the state with any values that aren't plain objects
