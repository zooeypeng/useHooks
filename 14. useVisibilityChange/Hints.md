Hint #1 – skeleton
Since the visibilityState is already managed by the document, there's no need to duplicate it with React instead. Instead, try using useSyncExternalStore to synchronize your component with the document's visibilityState.

import * as React from "react";

const subscribe = (callback) => {

};

const getSnapshot = () => {

};

const getServerSnapshot = () => {
  throw Error("useVisibilityChange is a client-only hook");
};

export default function useVisibilityChange() {
  
}
Hint #2 – subscribe
To listen to changes in the document's visibilityState, you can listen for the visibilitychange event.

const subscribe = (callback) => {
  document.addEventListener("visibilitychange", callback);

  return () => {
    document.removeEventListener("visibilitychange", callback);
  };
};
Hint #3 – getSnapshot
What you return from getSnapshot will be what gets returned when you invoke useSyncExternalStore. The whole point of this hook is to synchronize your component with the document's visibilityState, so that's what you should return.

const getSnapshot = () => {
  return document.visibilityState;
};
Hint #4 – useSyncExternalStore
You may be tempted to do something like this, where you return the invocation of useSyncExternalStore.

export default function useVisibilityChange() {
  return React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
}
However, useVisibilityChange is supposed to return a boolean value that indicates whether the document is visible or not. If you return the invocation of useSyncExternalStore, you'll just be returning what was returned from getSnapshot which was document.visibilityState.

You either need to change what you return from getSnapshot, or you need to change what you return from useVisibilityChange. I prefer the latter. Specifically, try returning a boolean that indicates whether visibilityState is visible or not.

export default function useVisibilityChange() {
  const visibilityState = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return visibilityState === "visible";
}