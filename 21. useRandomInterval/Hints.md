Hint #1 – Overview
Under the hood, useRandomInterval works by recursively calling a function that gets a random interval (that you can get with getRandomNumber) and then uses setTimeout to call the callback and then itself after interval milliseconds.

Hint #2 – useEffectEvent
Part of what makes this challenge tricky is that you need to call setTimeout inside of useEffect, but you also need to call cb inside of setTimeout. The problem is cb is a reference value and if you include it in useEffect's dependency array (assuming the consumer of useRandomInterval doesn't memoize it), then you'll be creating and destroying the timeout on every render.

To get around this, you can use React's useEffectEvent hook.

const onInterval = React.useEffectEvent(cb);
Now you can use onInterval inside of useEffect without having to declare it in your dependency array. Whenever onInterval is invoked, it will call cb.

Hint #3 – tick
Remember that useRandomInterval works by recursively calling a function that gets a random interval (that you can get with getRandomNumber) and then uses setTimeout to call the callback and then itself after interval milliseconds.

Here's a hint.

const tick = () => {
  const interval = getRandomNumber(minDelay, maxDelay);
  const id = window.setTimeout(() => {
    onInterval();
    tick();
  }, interval);
};
Hint #4 – timeoutId
Don't forget that useRandomInterval needs to return a function that the user can call in order to clear the timeout.

As a reminder, to clear a timeout you need to invoke window.clearTimeout, passing it the id that was returned when you first created the timer.

Practically speaking, what this means is that we need a way to get the id of the interval out of useEffect so that we can access it in function we return from useRandomInterval. This sounds like a good use case for using a ref.