useLongPress gives you a convenient way to add and manage long-press interactions to an element in a React application.

const attrs = useLongPress(
  callback,
  {
    onStart,
    onFinish,
    onCancel,
    threshold: 500
  }
);

...

<button {...attrs}>Press Me</button>
What it returns is a set of attributes that you can spread onto any element you'd like to add long press functionality to.

For the full documentation, see usehooks.com/uselongpress.

TASKS
useLongPress should return an object with the following properties: onMouseDown, onMouseUp, onMouseLeave, onTouchStart, and onTouchEnd
useLongPress should call the onStart callback when the user presses down on the element
useLongPress should call the onFinish callback when the user has long pressed the element
useLongPress should call the onCancel callback when the user has not long pressed the element and clear the timer
useLongPress should support touch events
useLongPress should call the callback after the threshold has passed
useLongPress should not call any callbacks if the user presses down on the element but does not long press it
useLongPress should ignore any events that are not mouse or touch events