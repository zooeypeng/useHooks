import * as React from "react";

export default function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = React.useState(value);

  React.useEffect(() => {
    const id = window.setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      window.clearTimeout(id);
    };
  }, [value, delay]);

  return debounceValue;
}
