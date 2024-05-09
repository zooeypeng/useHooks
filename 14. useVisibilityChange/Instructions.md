useVisibilityChange is useful for tracking the visibility state (document.visibilityState) of the document. It returns a boolean value that indicates whether the document is visible or not. It also updates the value when the document's visibility state changes by adding an event listener to the document's visibilitychange event.

const documentVisible = useVisibilityChange();
For the full documentation, see usehooks.com/usevisibilitychange.

TASKS
useVisibilityChange should return a boolean value that defaults to true
useVisibilityChange should return true when the document is visible
useVisibilityChange should return false when the document is not visible
useVisibilityChange should clean up the event listener when the component using useVisibilityChange is removed from the DOM