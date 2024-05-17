useThrottle gives you control over how often a value is updated. It accepts a value and an optional interval and returns a throttled value that will only be updated at most every interval milliseconds.

const throttledValue = useThrottle(value, interval);
For the full documentation, see usehooks.com/usethrottle.

TASKS
useThrottle should return a throttled value
useThrottle should only update the throttled value at most every interval milliseconds
useThrottle should update the throttled value immediately if the value changes after interval milliseconds have passed since the last update
useThrottle should clear the timeout when the component using useThrottle is removed from the DOM