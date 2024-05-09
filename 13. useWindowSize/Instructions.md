The useWindowSize hook is useful for retrieving and tracking the dimensions (innerWidth and innerHeight) of the browser window. It attaches an event listener to the resize event, ensuring its state (width and height) are updated dynamically whenever the window is resized.

const { width, height } = useWindowSize()
For the full documentation, see usehooks.com/usewindowsize.

TASKS
useWindowSize should return the correct width and height values of the browser's dimension
When the browser is resized, useWindowSize should return the updated width and height values of the browser's dimension
useWindowSize should clean up any event listeners it established when the component using useWindowSize is removed from the DOM