Hint #1 – useEffectEvent
What makes this hook tricky is needing to invoke the provided callback function inside of useEffect. Here's what you may have tried.

import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useTimeout(cb, ms) {
  React.useEffect(() => {
    const id = window.setTimeout(cb, ms);

    return () => {
      window.clearTimeout(id)
    };
  }, [cb, ms]);
}
There are a few problems with this approach. First, if the consumer of useTimeout doesn't memoize the callback function, you're going to be creating and destroying the timeout on every render. Not ideal. Second, useTimeout needs to return a function that allows the consumer of useTimeout to clear the timeout.

Let's tackle the dependency array problem first. This is the perfect use case for useEffectEvent. All you have to do is abstract your reactive but non-synchronizing logic into useEffectEvent, then you can use that function inside of useEffect without needing to include it as a dependency.

import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useTimeout(cb, ms) {
  const onTimeout = React.useEffectEvent(cb);

  React.useEffect(() => {
    const id = window.setTimeout(onTimeout, ms);

    return () => {
      window.clearTimeout(id);
    }
  }, [ms]);
}
Now you're able to (indirectly) invoke cb inside of useEffect without having to declare it in our dependency array.



Hint #2
As mentioned in the previous hint, in order to clear a timeout, you need to have access to the id that was returned when you first set up the timeout. The problem is we're setting up the timeout in a different location than where we need to clear it (in the return value).

To fix this, what if you stored the id returned from setTimeout in a ref? Then it would be preserved across renders and you'd be able to access it anywhere inside your hook.

const id = React.useRef(null);

...

React.useEffect(() => {
  id.current = window.setTimeout(onTimeout, ms);

  return handleClearTimeout;
}, [ms, handleClearTimeout]);
Now you can return a function that clears the timeout by referencing the id stored in the ref.