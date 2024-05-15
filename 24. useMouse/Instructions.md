useMouse gives you a convenient way to both track the mouse position relative to the entire document as well as the mouse position relative to a specific element if you so choose.

It uses the mousemove browser event under the hood.

const [{
  x,
  y,
  elementX,
  elementY,
  elementPositionX,
  elementPositionY
}, ref] = useMouse();
No matter what:

x: The mouse position relative to the entire document's left edge.
y: The mouse position relative to the entire document's top edge.
If ref is attached to an element:

elementX: The mouse position relative to the element's left edge.
elementY: The mouse position relative to the element's top edge.
elementPositionX: The element's position relative to the entire document.
elementPositionY: The element's position relative to the entire document.
For the full documentation, see usehooks.com/usemouse.

TASKS
useMouse should return an array with the first item being an object with the keys from the example and the second being a ref the user can attach to an element
useMouse should set up a mousemove event listener on the document
When the mouse moves, if the ref is not attached to an element, useMouse should only update its x and y properties
When the ref is attached to an element, useMouse should update its x, y, elementX, elementY, elementPositionX, and elementPositionY properties
useMouse should remove the mousemove event listener when the component using useMouse is removed from the DOM