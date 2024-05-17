Hint #1
From a high level, the way useThrottle works is it manages a value that will only be updated after interval milliseconds have passed since the last time the value was updated.

To to this, you obviously need to keep track of the last time the value was updated. Since this is a value you'll want to preserve across renders but it doesn't have anything to do with updating the UI, try using a ref.

Hint #2
When useThrottle runs, if it's been more than interval milliseconds since the last update, you'll want to update the throttled value. Otherwise, set a timeout to update the throttled value after interval milliseconds.

React.useEffect(() => {
  const now = Date.now();

  if (lastUpdated.current && now >= lastUpdated.current + interval) {
    lastUpdated.current = now;
    setThrottledValue(value);
  } else {
    const id = window.setTimeout(() => {
      lastUpdated.current = now;
      setThrottledValue(value);
    }, interval);

    return () => window.clearTimeout(id);
  }
}, [value, interval]);
The reason you need both is because they both handle different situations. For example, if you got rid of the first conditional and the user kept updating value faster than every interval milliseconds, the throttled value would never update. On the other hand, if you got rid of the second conditional, the throttled value would only update when an update occurs after interval milliseconds. Meaning any update before interval milliseconds would be ignored and the throttled value would become stale.