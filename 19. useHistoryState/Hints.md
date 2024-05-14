Hint #1 – useReducer
You're given a completed reducer function and initialState object. This is enough to invoke useReducer and get back a state and dispatch function.

export default function useHistoryState(initialPresent = {}) {
  const [state, dispatch] = React.useReducer(reducer, {
    ...initialState,
    present: initialPresent
  });

  return { state: state.present };
}
Hint #2 – canUndo, canRedo
Part of the return value of useHistoryState are two properties, canUndo and canRedo. As the names suggest, these are booleans that indicate whether or not the user can undo or redo the last action. Deriving these is pretty simple because math.

If the past array has any items, then the user can undo. If the future array has any items, then the user can redo.

export default function useHistoryState(initialPresent = {}) {
  const [state, dispatch] = React.useReducer(reducer, {
    ...initialState,
    present: initialPresent
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  return { state: state.present, canUndo, canRedo };
}
Hint #3 – undo
Part of the return value of useHistory state is an undo function that allows the user to undo the last action. All the logic for handling this is already done inside of the reducer function. However, you only want do dispatch the UNDO action if there's something to undo. Luckily we already have a variable representing this, canUndo.

const undo = React.useCallback(() => {
  if (canUndo) {
    dispatch({ type: "UNDO" });
  }
}, [canUndo]);
Also note that we're wrapping the function inside of useCallback. This is a good practice whenever you're making a custom hook so that the consumer of the hook can use React.memo without worrying about the reference to the function changing.

Hint #4 – redo
Part of the return value of useHistoryState is a redo function that allows the user to redo the last action. All the logic for handling this is already done inside of the reducer function. However, you only want do dispatch the REDO action if there's something to redo. Luckily we already have a variable representing this, canRedo.

const redo = React.useCallback(() => {
  if (canRedo) {
    dispatch({ type: "REDO" });
  }
}, [canRedo]);
Hint #5 – set
Part of the return value of useHistoryState is a set function that allows the user to set the state to a new value. All the logic for handling this is already done inside of the reducer function. As shown in the reducer, all you need to do is pass along the new value as the newPresent property of the action.

const set = React.useCallback(
  (newPresent) => dispatch({ type: "SET", newPresent }),
  []
);
Hint #6 – clear
Part of the return value of useHistoryState is a clear function that resets the state to its initial value. The tricky part here is that we've been wrapping all of our functions in useCallback and in order to reset the state, we need to pass along the initialPresent value to our CLEAR action. However, this would nullify the benefits of useCallback since initialPresent is a reference value and we'd have to include it in the dependency array.

const clear = React.useCallback(
  () =>
    dispatch({ type: "CLEAR", initialPresent }),
  [initialPresent]
);
To get around this, we can use a useRef hook to store the initial value of initialPresent and then reference that value inside of our useCallback function without needing to add it to useCallback's dependency array.

export default function useHistoryState(initialPresent = {}) {
  const initialPresentRef = React.useRef(initialPresent);

  ...

  const clear = React.useCallback(
    () =>
      dispatch({ type: "CLEAR", initialPresent: initialPresentRef.current }),
    []
  );

  ...
}