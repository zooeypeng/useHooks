Hint #1 – increment
As you should with every callback function you return from a custom hook, you'll first want to wrap the function in useCallback so its reference is stable and it doesn't negate any React.memos that the consumer of the function has in their component tree.

const increment = React.useCallback(() => {

}, [])
Now the tricky part is you only want to increment count by 1 if the new value is still less than the max value. To do that, you may be tempted to do something like this.

const increment = React.useCallback(() => {
  const nextCount = count + 1;

  if (typeof max === "number" && nextCount > max) {
    return
  }

  return setCount(nextCount);
}, [count, max])
The problem here is that useCallback is going to be recalculated every time count or max changes – and since we're changing count inside the callback, we've sort of negated all the benefits of using useCallback.

Instead, what if you did something like this? Where you keep max inside the array, but you get access to the current value of count by passing setCount a function?

const increment = React.useCallback(() => {
  setCount((c) => {
    const nextCount = c + 1;

    if (typeof max === "number" && nextCount > max) {
      return c;
    }

    return nextCount;
  });
}, [max]);
Now you get the benefits of useCallback, but the reference will stay the same unless max changes.

Hint #2 – decrement
decrement will follow the same pattern as increment except you'll want to make sure that the new value is still greater than the min value.

const decrement = React.useCallback(() => {
  setCount((c) => {
    const nextCount = c - 1;

    if (typeof min === "number" && nextCount < min) {
      return c;
    }

    return nextCount;
  });
}, [min]);

Hint #3 – set
set follows a similar pattern to increment and decrement, except this time both min and max should be included in the dependency array. Remember that before you set the counter, you'll need to make sure that you're not going over the max value or under the min value.

const set = React.useCallback(
  (nextCount) => {
    setCount((c) => {
      if (typeof max === "number" && nextCount > max) {
        return c;
      }

      if (typeof min === "number" && nextCount < min) {
        return c;
      }

      return nextCount;
    });
  },
  [max, min]
);

Hint #4 – reset
When reset is invoked, you'll want to set count back to its startingValue.

const reset = React.useCallback(() => {
  setCount(startingValue);
}, [startingValue]);