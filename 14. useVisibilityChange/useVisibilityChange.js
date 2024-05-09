import * as React from "react";

export default function useVisibilityChange() {
  const subscribe = (cb) => {
    document.addEventListener("visibilitychange", cb);

    return () => {
      document.removeEventListener("visibilitychange", cb);
    };
  };

  const getSnapshot = () => {
    return document.visibilityState;
  };

  const getServerSnapshot = () => {
    throw Error("useVisibilityChange is a client hook");
  };

  const visibilityState = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return visibilityState === "visible";
}
