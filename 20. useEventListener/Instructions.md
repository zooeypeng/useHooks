useEventListener gives you a simple way to add event listeners to a target element.

useEventListener(target, eventName, handler, options);
For the full documentation, see usehooks.com/useeventlistener.

TASKS
useEventListener should accept a target element, an eventName, a handler function, and an optional options object
useEventListener should add an event listener to the target element unless the target element is not defined
useEventListener should update the event listener when the target, eventName, or options change
useEventListener should remove the event listener when the component using useEventListener is removed from the DOM