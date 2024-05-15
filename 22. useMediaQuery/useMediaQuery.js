import * as React from "react";

export default function useMediaQuery(query) {
  const subscribe = React.useCallback(
    (cb) => {
      const matchMedia = window.matchMedia(query);

      matchMedia.addEventListener("change", cb);

      return () => {
        matchMedia.removeEventListener("change", cb);
      };
    },
    [query]
  );

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => {
    throw Error("It's a client-only hook.");
  };

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
