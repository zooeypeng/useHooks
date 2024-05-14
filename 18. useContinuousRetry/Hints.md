Hint #1 – onInterval
You know that in order to add the retry functionality, you'll have to use setInterval to call the callback function at a specified interval. This is obviously a side effect, so you'll want to put it inside of useEffect.

import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useContinuousRetry(
  callback,
  interval = 100,
  options = {}
) {
  const { maxRetries = Infinity } = options;
  const [hasResolved, setHasResolved] = React.useState(false);

  React.useEffect(() => {
    
  }, [interval, maxRetries]);

  return hasResolved;
}
The problem is that callback is a reference value, and to use it inside of useEffect, you need to declare add it to the dependency array. But if you do that, and the consumer of useContinuousRetry doesn't memoize the callback, you'll be creating and destroying the interval on every render.

To fix this, and to relieve the memoization burden from the consumer, you can pass the callback to useEffectEvent which will return you a function that you can then use inside of useEffect without needing to declare it in your dependency array.

import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useContinuousRetry(
  callback,
  interval = 100,
  options = {}
) {
  const { maxRetries = Infinity } = options;
  const [hasResolved, setHasResolved] = React.useState(false);
  const onInterval = React.useEffectEvent(callback);

  React.useEffect(() => {
    
  }, [interval, maxRetries]);

  return hasResolved;
}
Hint #2 – setInterval
To add the continuous retry functionality, you'll want to invoke setInterval and have the interval run every interval milliseconds.

React.useEffect(() => {
  const id = window.setInterval(() => {
    
  }, interval);

  return () => window.clearInterval(id);
}, [interval, maxRetries]);
Then inside the interval, if onInterval returns a truthy value, you'll set hasResolved to true and clear the interval. If not, and the number of retries is greater than or equal to maxRetries, you'll clear the interval. Otherwise, you'll increment the number of retries and keep the interval alive.

React.useEffect(() => {
  let retries = 0;

  const id = window.setInterval(() => {
    if (onInterval()) {
      setHasResolved(true);
      window.clearInterval(id);
    } else if (retries >= maxRetries) {
      window.clearInterval(id);
    } else {
      retries += 1;
    }
  }, interval);

  return () => window.clearInterval(id);
}, [interval, maxRetries]);