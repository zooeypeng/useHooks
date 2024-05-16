useWindowScroll allows you to conveniently track the current scroll position of the window as well as scroll to a specific position.

Under the hood it listens to the browser's scroll event and updates its x and y state with window.scrollX and window.scrollY. It also returns a scrollTo function that uses the same API as window.scrollTo.

const [{ x, y }, scrollTo] = useWindowScroll();
For the full documentation, see usehooks.com/usewindowscroll.

TASKS
useWindowScroll should return an array with two items: an object with x and y properties, and a scrollTo function
useWindowScroll should listen to the scroll event and update the x and y state with window.scrollX and window.scrollY
useWindowScroll should return a scrollTo function that uses the same API as window.scrollTo
useWindowScroll should throw an error if scrollTo is called with invalid arguments
useWindowScroll should clean up the scroll event listener when the component using useWindowScroll is removed from the DOM