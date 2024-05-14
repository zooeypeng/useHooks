useHistoryState is similar to useState or useReducer in that it allows you to manage state in a React component. The difference is useHistoryState comes with some extra functionality that keeps track of the history of the changes made to the state.

const { state, canUndo, canRedo, set, undo, redo, clear } = useHistoryState(defaultState);
For the full documentation, see usehooks.com/usehistorystate.

TASKS
useHistoryState should return an object with the following properties: state, canUndo, canRedo, set, undo, redo, clear
useHistoryState should set the initial state to the value passed to the hook
useHistoryState should allow the user to undo the last action
useHistoryState should allow the user to redo the last action
useHistoryState should allow the user to set the state to a new value
useHistoryState should allow the user to clear the state and reset it to its initial value
useHistoryState should return the correct values for canUndo and canRedo based on the current state