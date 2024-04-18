import * as React from "react";

export default function useDefault(initialState, defaultState) {
  const [state, setState] = React.useState(initialState);

  if (state === undefined || state === null) {
    return [defaultState, setState];
  } else {
    return [state, setState];
  }
}
