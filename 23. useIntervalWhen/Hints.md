Hint #1 – overview
You can break this hook down into three parts.

Setting up an interval timer when when is true
Returning a function that will clear the interval
If startImmediately is true, call the callback function immediately before starting the interval
Hint #2 – setInterval
This challenge is a lot trickier if you're not familiar with the browser's setInterval method. Here's how it works.

You pass it a callback function as the first argument and an integer as the second argument.

const id = window.setInterval(callback, ms);
Now, every ms milliseconds, the browser will invoke callback until you clear the timeout by invoking clearInterval, passing it the id that was returned when you called setInterval.

window.clearInterval(id)
Hint #3 – when
Part of what makes this hook tricky is needing to invoke the provided callback function inside of useEffect. Here's what you may have tried.

import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useIntervalWhen(cb, { ms, when, startImmediately }) {
  React.useEffect(() => {
    if (when === true) {
      const id = window.setInterval(cb, ms);
      return () => window.clearInterval(id);
    }
  }, [cb, ms, when]);
}
There are a few problems with this approach. First, if the consumer of useIntervalWhen doesn't memoize the callback function, you're going to be creating and destroying the interval on every render. Not ideal. Second, useIntervalWhen needs to return a function that allows the consumer of useIntervalWhen to clear the interval.

Let's tackle the dependency array problem first. This is the perfect use case for useEffectEvent. All we have to do is abstract our reactive but non-synchronizing logic into useEffectEvent, then we can use that event handler inside of useEffect without needing to include it as a dependency.

import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useIntervalWhen(cb, { ms, when, startImmediately }) {
  const onTick = React.useEffectEvent(cb);

  React.useEffect(() => {
    if (when === true) {
      const id = window.setInterval(onTick, ms);
      return () => window.clearInterval(id);
    }
  }, [ms, when]);
}
Now we're able to (indirectly) invoke cb inside of useEffect without having to declare it in our dependency array.

Next let's tackle the return value. As mentioned in Hint #2, in order to clear an interval, you need to have access to the id that was returned when you first set up the interval. The problem is we're setting up the interval in a different place than where we need to clear it (in the return value).

To fix this, what if you stored the id returned from setInterval in a ref? Then it would be preserved across renders and you'd be able to access it anywhere inside your hook.

import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useIntervalWhen(cb, { ms, when, startImmediately }) {
  const id = React.useRef(null);
  const onTick = React.useEffectEvent(cb);

  const handleClearInterval = React.useCallback(() => {
    window.clearInterval(id.current);
  }, []);

  React.useEffect(() => {
    if (when === true) {
      id.current = window.setInterval(onTick, ms);
      return handleClearInterval;
    }
  }, [ms, when, handleClearInterval]);

  return handleClearInterval;
}
Because we put the return value of setInterval in a ref, we can now access it inside of handleClearInterval and that can be our return value.

Hint #4 – startImmediately
The last remaining functionality of useIntervalWhen is if startImmediately is true, you need to call the callback function immediately before starting the interval. The easiest way to do this is if startImmediately and when evaluate to true, invoke the callback function.

The tricky part of doing this is you need to keep track of if you've already called the callback function initially, so you don't call it again on subsequent renders. You can keep track of that state in a ref.

const immediatelyCalled = React.useRef(
  startImmediately === true ? false : null
);

React.useEffect(() => {
  if (when === true) {
    id.current = window.setInterval(onTick, ms);

    if (startImmediately === true && immediatelyCalled.current === false) {
      onTick();
      immediatelyCalled.current = true;
    }

    return handleClearInterval;
  }
}, [ms, when, startImmediately, handleClearInterval]);
The reason you have to put this functionality in useEffect and not just do it during render is because it's against the rules of React to to write to refs during render.