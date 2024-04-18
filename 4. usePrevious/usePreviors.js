import * as React from "react";

export default function usePrevious(value) {
  const [current, setCurrent] = React.useState(value);
  const [previous, setPrevious] = React.useState(null);

  if (current !== value) {
    setPrevious(current);
    setCurrent(value);
  }
  return previous;
}
