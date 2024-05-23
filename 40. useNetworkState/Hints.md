Hint #1 – useSyncExternalStore
Since the browser is already managing the user's network state, you'll want to use React's useSyncExternalStore hook so you don't duplicate that state.

import * as React from "react";

const isShallowEqual = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
};

const getConnection = () => {
  return (
    navigator?.connection ||
    navigator?.mozConnection ||
    navigator?.webkitConnection
  );
};

const subscribe = (callback) => {

}

const getServerSnapshot = () => {

};

export default function useNetworkState() {
  const getSnapshot = () => {

  };

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
The reason subscribe is outside of the hook is because it won't depend on the scope of useNetworkState and we want its reference to be consistent across renders. getSnapshot, however, will depend on the scope of useNetworkState since it will eventually need to access a cache that we'll create.

Hint #2 – subscribe
There are three events you'll want to subscribe to: online, offline, and the change event on the navigator.connection object. We've provided a getConnection helper function for you that adds some support for older browsers.

The { passive: true } tells the browser that these event listeners don't prevent scrolling, which increases performance.

const subscribe = (callback) => {
  window.addEventListener("online", callback, { passive: true });
  window.addEventListener("offline", callback, { passive: true });

  const connection = getConnection();

  if (connection) {
    connection.addEventListener("change", callback, { passive: true });
  }

  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);

    if (connection) {
      connection.removeEventListener("change", callback);
    }
  };
};
Hint #3 – getSnapshot
getSnapshot is the function that will be called whenever the callback function in subscribe is called. It's responsible for returning the current network state. Since we already provided the correct shape structure for you in the starter code, you can just move that into getSnapshot.

const getSnapshot = () => {
  const online = navigator.onLine;
  const connection = getConnection();

  return {
    online,
    downlink: connection?.downlink,
    downlinkMax: connection?.downlinkMax,
    effectiveType: connection?.effectiveType,
    rtt: connection?.rtt,
    saveData: connection?.saveData,
    type: connection?.type
  };
}
That's a good start, but notice any issues? Remember that if the value you return from getSnapshot is a reference value like an object or an array, and that reference value isn't memoized, then you could throw React into an infinite loop scenario since useSyncExternalStore will re-render every time the reference value changes, which would be every render.

What we'll want to do is memoize the value returned from getSnapshot so that it only changes when the network state changes. We can do that by using a useRef hook to store the previous value and then comparing it to the next value. If they're the same, we can return the previous value. If they're different, we can update the previous value and return the next value.

const cache = React.useRef({});

...

const getSnapshot = () => {
  const online = navigator.onLine;
  const connection = getConnection();

  const nextState = {
    online,
    downlink: connection?.downlink,
    downlinkMax: connection?.downlinkMax,
    effectiveType: connection?.effectiveType,
    rtt: connection?.rtt,
    saveData: connection?.saveData,
    type: connection?.type
  };

  if (isShallowEqual(cache.current, nextState)) {
    return cache.current;
  } else {
    cache.current = nextState;
    return nextState;
  }
};
Hint #4 – getServerSnapshot
If someone tries to use useNetworkState in a server environment where there is no navigator object, we want to throw an explicit error.

const getServerSnapshot = () => {
  throw Error("useNetworkState is a client-only hook");
};