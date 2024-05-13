The useDebounce hook is useful for delaying the execution of functions or state updates until a specified time period has passed without any further changes to the debounced value. This is especially useful in scenarios such as handling user input or triggering network requests, where it effectively reduces unnecessary computations and ensures that resource-intensive operations are only performed after a pause in the input activity.

This hook works by taking in two arguments, value and delay. value is the value you want to debounce, and delay is the amount of milliseconds you want to wait before updating the value.

const debouncedValue = useDebounce(value, delay);
For the full documentation, see usehooks.com/usedebounce.

TASKS
Return a piece of state that is initialized with the value passed to useDebounce
Update the debounced value after delay milliseconds has passed since the last time value changed
Do not update the debounced value before delay milliseconds has passed since the last time value changed
Cleanup the previous timeout when value or delay changes