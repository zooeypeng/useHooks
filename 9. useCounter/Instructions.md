useCounter is a hook for managing a numeric counter value. It allows you to specify a min and max value, then gives you helper methods (increment, decrement, set, and reset) for managing the value.

const [count, { increment, decrement, set, reset }] = useCounter(initialCountValue, {
  min: 5,
  max: 10
});
For the full documentation, see usehooks.com/usecounter.

TASKS
As its first argument, useCounter should accept a starting value and default it to 0 if no value is provided
As its second argument, useCounter should also accept an object with min and max values and throw an error if the starting value is outside of that range
useCounter should return an array with the first item being the current value of count and the second being an object with increment, decrement, set, and reset methods
useCounter should increment the count value by 1 when increment is called (unless the max value is reached)
useCounter should decrement the count value by 1 when decrement is called (unless the min value is reached)
useCounter should set the count value to the provided value when set is called (unless the min or max value is reached)
useCounter should reset the count value to the starting value when reset is called (unless the count value is already the starting value)