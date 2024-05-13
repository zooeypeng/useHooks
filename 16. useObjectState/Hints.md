Hint #1
useObjectState should have a similar return value to useState in that it should return an array with the first item being the state and the second item being a way to update that state.

You'll also want to wrap your updater function inside of useCallback so that any consumer of useObjectState can pass it down via props if they'd like without invalidating their potential use of React.memo.

import * as React from "react";

const isPlainObject = (value) => {
  return Object.prototype.toString.call(value) === "[object Object]";
};

export default function useObjectState(initialValue) {
  const [state, setState] = React.useState(initialValue);

  const handleUpdate = React.useCallback((arg) => {
    
  }, []);

  return [state, handleUpdate];
}
Hint #2
useObjectState should only accept two argument types – an object and a function. Anything else should be ignored.

You can use the provided usePlainObject function to determine if the arg is an actual object (and not an array, function, null, Date, RegExp, etc. 😅.)

import * as React from "react";

const isPlainObject = (value) => {
  return Object.prototype.toString.call(value) === "[object Object]";
};

export default function useObjectState(initialValue) {
  const [state, setState] = React.useState(initialValue);

  const handleUpdate = React.useCallback((arg) => {
    if (typeof arg === "function") {

    }

    if (isPlainObject(arg)) {

    }
  }, []);

  return [state, handleUpdate];
}
Hint #3
If the argument passed to useObjectState's updater function is a function, then you should invoke that function to get the new state, passing it the current state as the first argument. From there, if the value returned from the function is an (actual) object, you'll update the state by merging the old and new state together.

const handleUpdate = React.useCallback((arg) => {
  if (typeof arg === "function") {
    setState((s) => {
      const newState = arg(s);

      if (isPlainObject(newState)) {
        return {
          ...s,
          ...newState
        };
      }
    });
  }

    if (isPlainObject(arg)) {

    }
}, []);
If it's an object, then you should update the state, merging the old and new state together.

const handleUpdate = React.useCallback((arg) => {
  if (typeof arg === "function") {
    setState((s) => {
      const newState = arg(s);

      if (isPlainObject(newState)) {
        return {
          ...s,
          ...newState
        };
      }
    });
  }

  if (isPlainObject(arg)) {
    setState((s) => ({
      ...s,
      ...arg
    }));
  }
}, []);