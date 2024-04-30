The useLockBodyScroll hook temporarily disables scrolling on the document. This can be beneficial in scenarios where you want to restrict scrolling while displaying a modal, a dropdown menu, or any other component that requires the user’s focus. Once the component using useLockBodyScroll is removed from the DOM, the original overflow style should be reapplied, ensuring that the scroll behavior is reverted to its previous state.

For the full documentation, see usehooks.com/uselockbodyscroll.

TASKS
useLockBodyScroll should prevent the user from scrolling the document by setting overflow to hidden on the document's body
useLockBodyScroll should continue to prevent the user from scrolling across multiple component re-renders
useLockBodyScroll should reset the overflow position back to its original value when the component using useLockBodyScroll is removed from the DOM