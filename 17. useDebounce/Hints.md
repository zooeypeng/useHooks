Hint #1
Before worrying about the debouncing logic, you'll first want to create a piece of state that is initialized with the initial value passed to the hook. This state will be the debounced value we return from the hook.

import * as React from "react";

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  return debouncedValue;
}
Hint #2
Next, you'll want to update debouncedValue after it's been delay milliseconds since value has changed. To do that, we'll invoke setTimeout inside of useEffect, and after delay milliseconds, we'll invoke setDebouncedValue with the current value.

import * as React from "react";

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const id = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      window.clearTimeout(id);
    };
  }, [value, delay]);

  return debouncedValue;
}
This works because if value or delay changes, since the effect depends on those values, React will clear the timeout before re-running the effect. That way, setDebouncedValue will only ever be called if it's been delay milliseconds since value has changed.