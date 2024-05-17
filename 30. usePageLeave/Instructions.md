usePageLeave is useful for tracking when a user leaves or navigates away from a web page. It works by listening to the document's mouseout event under the hood.

usePageLeave(callback)
For the full documentation, see usehooks.com/usepageleave.

TASKS
usePageLeave should accept a callback function as its only argument
usePageLeave should add an event listener to the document for the mouseout event
usePageLeave should call the callback function when the user mouses out of the page
usePageLeave should not call the callback if the user mouses out of the page and then back in
usePageLeave should remove the event listener when the component using usePageLeave is removed from the DOM