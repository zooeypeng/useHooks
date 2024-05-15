Hint #1
In order to know if the user is clicking inside or outside of the element, we need to get a reference to that element. To do that, we'll create and return a ref for the user to attach to whichever element they'd like to track clicks on.

import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useClickAway(cb) {
  const ref = React.useRef(null);

  return ref;
}
Hint #2
Next we need to listen for the mousedown and touchstart events on the document. Because this is a side effect, we'll want to do that inside of useEffect.

The problem that you may have run into is that we need to use the callback function (cb) inside of our event listeners, and therefore, inside of our effect – which means we need to include it in useEffect's dependency array. However, since cb is a reference value, every time the component re-renders, cb will be a new function which will re-run the effect.

We have a few options.

First, we can tell the consumer of useClickAway to wrap the function they pass to it in useCallback so it's always referentially stable. The problem with this approach is that it's brittle. useHooks is a library that anyone can consume. The odds of someone forgetting to wrap their function in useCallback is very high.

Instead of putting the burden on the consumer, we can use useEffectEvent in order to abstract away our reactive but non-synchronizing value (cb) so we can use it inside of useEffect.

export default function useClickAway(cb) {
  const ref = React.useRef(null);

  const onEventHandler = React.useEffectEvent((e) => {
    // can invoke cb here without including it in the dependency array
  });

  React.useEffect(() => {
    document.addEventListener("mousedown", onEventHandler);
    document.addEventListener("touchstart", onEventHandler);

    return () => {
      document.removeEventListener("mousedown", onEventHandler);
      document.removeEventListener("touchstart", onEventHandler);
    };
  }, []);

  return ref;
}
Hint #3
Now the only other thing we need to figure out is when we should invoke cb. From a high-level perspective, it's pretty simple – we want to invoke cb when the user clicks outside of the element that the ref is attached to. To do this, we can pass e.target (which is the element that was clicked) to element.contains (which will return true if the element that was clicked is inside of the element that the ref is attached to).

export default function useClickAway(cb) {
  const ref = React.useRef(null);

  const onEventHandler = React.useEffectEvent((e) => {
    const element = ref.current;
    if (element && !element.contains(e.target)) {
      cb(e);
    }
  });

  React.useEffect(() => {
    document.addEventListener("mousedown", onEventHandler);
    document.addEventListener("touchstart", onEventHandler);

    return () => {
      document.removeEventListener("mousedown", onEventHandler);
      document.removeEventListener("touchstart", onEventHandler);
    };
  }, []);

  return ref;
}