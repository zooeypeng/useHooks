Hint #0 – vs useLocalStorage
Yes, useSessionStorage is very similar to useLocalStorage. The implementations are almost identical.

Hint #1 – overview
useSessionStorage seems complex, but conceptually it's pretty straight forward. It does three things:

Uses useSyncExternalStore to subscribe to storage events and to get the latest key value in session storage.
Returns an array with the first item being the value in sessionStorage and the second being a function to update that value
If there's not a value in sessionStorage at key and initialValue is defined, it sets the value in sessionStorage to initialValue
Hint #2 – useSyncExternalStore
Try tackling useSyncExternalStore first. As you know, to do so you'll need to finish the subscribe and getSnapshot functions.

For subscribe, you'll simply add an event listener for the storage event.

const subscribe = (callback) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};
For getSnapshot, you'll want to return the value in sessionStorage located at key. There's already a helper function available to do this (getItem), so you can just use that.

const getSnapshot = () => getItem(key);
The reason subscribe is located outside of the component is so that its reference remains stable across renders so React won't unsubscribe/resubscribe on every render.

The reason getSnapshot is located inside of the component is so it can reference key from the component's scope.

Hint #3 – setState
Next, try to tackle setState. Remember that it behaves similar to the setState function returned from useState, but it stores the value in sessionStorage instead of component state. This means that, like setState, you can pass it either a value or a function.

If you pass it a value, it should update sessionStorage with that value. If you pass it a function, it should call that function with the current value in sessionStorage to get the next value, and then update sessionStorage with that value. The only difference is that if the new value is undefined or null, it should remove the item from sessionStorage instead of updating it.

Keep in mind you're given two functions to help you out, removeItem and setItem.

const setState = (v) => {
  try {
    const nextState = typeof v === "function" ? v(JSON.parse(store)) : v;

    if (nextState === undefined || nextState === null) {
      removeItem(key);
    } else {
      setItem(key, nextState);
    }
  } catch (e) {
    console.warn(e);
  }
}
And of course, you'll want to make sure you memoize the function before you return.

const setState = React.useCallback(
  (v) => {
    try {
      const nextState = typeof v === "function" ? v(JSON.parse(store)) : v;

      if (nextState === undefined || nextState === null) {
        removeItem(key);
      } else {
        setItem(key, nextState);
      }
    } catch (e) {
      console.warn(e);
    }
  },
  [key, store]
);
Hint #4 – initialValue
The last thing you need to do is if there's not a value at key in sessionStorage, and initialValue is defined, set the value in sessionStorage to the initialValue

You may be tempted to do this in render, but remember, this is a side effect so you'll want to put it in useEffect.

React.useEffect(() => {
  if (getItem(key) === null && typeof initialValue !== "undefined") {
    setItem(key, initialValue);
  }
}, [key, initialValue]);