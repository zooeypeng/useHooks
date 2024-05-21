Hint #1
Math is hard. Use this formula to set the initial value of count.

Math.round((endTime - Date.now()) / options.interval)
As a reminder, Date.now() is a side effect.

Hint #2
Before you worry about the tricky parts, first try setting up your interval that runs every options.interval milliseconds.

Hint #3
There's a good chance that this is where you're getting stuck.

import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useCountdown(endTime, options) {
  const [count, setCount] = React.useState(null);

  React.useEffect(() => {
    setCount(Math.round((endTime - Date.now()) / options.interval));
  }, [endTime, options.interval]);

  React.useEffect(() => {
    const id = window.setInterval(() => {

    }, options.interval);

    return () => window.clearInterval(id);
  }, [options.interval]);

  return count;
}
You have your interval, but you now need to invoke options.onTick and options.onComplete inside of useEffect. The problem is both of those are reference values and if you include them in the dependency array, you'll be creating and destroying the interval on every render. This is the perfect use case for useEffectEvent.

Try creating an onTick function using useEffectEvent that encapsulates all of the logic for what should happen when the interval runs. Specifically, you'll want to check if count is 0 and if so, invoke options.onComplete and clears the interval. Otherwise, you'll want to invoke options.onTick and decrement count by 1.

Hint #4
If you're still stuck, let's walk through it. As mentioned in Hint #3, you'll want to create an onTick function using useEffectEvent that encapsulates all of the logic for what should happen when the interval runs.

const onTick = React.useEffectEvent(() => {
  if (count === 0) {
    // TODO: clear interval
    options.onComplete();
  } else {
    setCount(count - 1);
    options.onTick();
  }
});
The logic for onTick is pretty straight forward, except for clearing the interval. In order to clear the interval, you'll need to invoke window.clearInterval passing it the id that was returned when you first set up the interval. The problem is we set up the interval in a different location that onTick, meaning we don't have access to the id it created. To fix this, let's store the id in a ref, that way it'll be preserved across renders and we can still access it inside of onTick.

import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useCountdown(endTime, options) {
  const [count, setCount] = React.useState(null);
  const intervalIdRef = React.useRef(null);

  const handleClearInterval = () => {
    window.clearInterval(intervalIdRef.current);
  };

  const onTick = React.useEffectEvent(() => {
    if (count === 0) {
      handleClearInterval();
      options.onComplete();
    } else {
      setCount(count - 1);
      options.onTick();
    }
  });

  React.useEffect(() => {
    setCount(Math.round((endTime - Date.now()) / options.interval));
  }, [endTime, options.interval]);

  React.useEffect(() => {
    intervalIdRef.current = window.setInterval(onTick, options.interval);

    return () => handleClearInterval();
  }, [options.interval]);

  return count;
}
By moving the interval's id to a ref and creating a dedicated handleClearInterval function, anywhere inside of our hook we're able to clear the interval.