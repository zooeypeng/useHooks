Hint #1
This challenge is a lot trickier if you're not familiar with the browser's setInterval method. Here's how it works.

You pass it a callback function as the first argument and an integer as the second argument.

const id = window.setInterval(callback, ms);
Now, every ms milliseconds, the browser will invoke callback until you clear the interval by invoking clearInterval, passing it the id that was returned when you called setInterval.

window.clearInterval(id)

Hint #2
What makes this hook tricky is needing to invoke the provided callback function inside of useEffect. Here's what you may have tried.

import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useInterval(cb, ms) {
  React.useEffect(() => {
    const id = window.setInterval(cb, ms);

    return () => {
      window.clearInterval(id)
    };
  }, [cb, ms]);
}
There are a few problems with this approach. First, if the consumer of useInterval doesn't memoize the callback function, you're going to be creating and destroying the interval on every render. Not ideal. Second, useInterval needs to return a function that allows the consumer of useInterval to clear the interval.

Let's tackle the dependency array problem first. This is the perfect use case for useEffectEvent. All we have to do is abstract our reactive but non-synchronizing logic into useEffectEvent, then we can use that event handler inside of useEffect without needing to include it as a dependency.

import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useInterval(cb, ms) {
  const onInterval = React.useEffectEvent(cb);

  React.useEffect(() => {
    const id = window.setInterval(onInterval, ms);

    return () => {
      window.clearInterval(id)
    };
  }, [ms]);
}
Now we're able to (indirectly) invoke cb inside of useEffect without having to declare it in our dependency array.

Next let's tackle the return value. As mentioned earlier, in order to clear an interval, you need to have access to the id that was returned when you first set up the interval. The problem is we're setting up the interval in a different place than where we need to clear it (in the return value).

To fix this, what if you stored the id returned from setInterval in a ref? Then it would be preserved across renders and you'd be able to access it anywhere inside your hook.

import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useInterval(cb, ms) {
  const id = React.useRef(null);
  const onInterval = React.useEffectEvent(cb);

  const handleClearInterval = React.useCallback(() => {
    window.clearInterval(id.current);
  }, []);

  React.useEffect(() => {
    id.current = window.setInterval(onInterval, ms);

    return handleClearInterval;
  }, [ms, handleClearInterval]);

  return handleClearInterval;
}
Because we put the return value of setInterval in a ref, we can now access it inside of handleClearInterval and that can be our return value.