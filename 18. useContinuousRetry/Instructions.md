useContinuousRetry allows you to repeatedly call a specified callback function at a defined interval until the callback returns a truthy value, indicating a successful resolution. This hook is particularly handy when dealing with asynchronous operations or API calls that may fail temporarily and need to be retried automatically.

const hasResolved = useContinuousRetry(callback, interval, { maxRetries });
For the full documentation, see usehooks.com/usecontinuousretry.

TASKS
useContinuousRetry should accept a callback function, an interval in milliseconds, and an options object
useContinuousRetry should return a boolean value indicating whether or not the callback has resolved
useContinuousRetry should call the callback function at the specified interval until the callback returns a truthy value
useContinuousRetry should stop calling the callback function if the number of retries exceeds the maxRetries option
useContinuousRetry should clear the interval when the component is removed from the DOM
