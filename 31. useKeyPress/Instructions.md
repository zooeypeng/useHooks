useKeyPress gives you a convenient way to listen for key presses on a specific target. It defaults to adding an event listener for the keydown event on window, but allows the user to customize that via its third options argument.

useKeyPress(key, handler, options);
For the full documentation, see usehooks.com/usekeypress.

TASKS
useKeyPress should add an event listener for the keydown event on window
useKeyPress should call the handler function when the key argument matches the event.key value
useKeyPress should support event options via the options argument
useKeyPress should remove the event listener when the component using useKeyPress is removed from the DOM