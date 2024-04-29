import * as React from "react";

export default function useCounter(startingValue = 0, options = {}) {
  const { min, max } = options;

  if (typeof min === "number" && startingValue < min) {
    throw new Error(
      `Your starting value of ${startingValue} is less than your min of ${min}.`
    );
  }

  if (typeof max === "number" && startingValue > max) {
    throw new Error(
      `Your starting value of ${startingValue} is greater than your max of ${max}.`
    );
  }

  const [count, setCount] = React.useState(startingValue);

  const increment = React.useCallback(() => {
    setCount((c) => {
      const nextCount = c + 1;

      if (nextCount > max) {
        return c;
      }

      return nextCount;
    });
  }, [max]);

  const decrement = React.useCallback(() => {
    setCount((c) => {
      const nextCount = c - 1;

      if (nextCount < min) {
        return c;
      }

      return nextCount;
    });
  }, [min]);

  const set = React.useCallback(
    (nextCount) => {
      setCount((c) => {
        if (nextCount > max) {
          return c;
        }

        if (nextCount < min) {
          return c;
        }

        return nextCount;
      });
    },
    [min, max]
  );

  const reset = React.useCallback(() => {
    setCount(startingValue);
  }, [startingValue]);

  return [
    count,
    {
      increment,
      decrement,
      set,
      reset,
    },
  ];
}
