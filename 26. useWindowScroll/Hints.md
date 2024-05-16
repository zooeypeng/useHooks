Hint #1 – scroll event
There are really two aspects to this challenge. First is listening to the scroll event and updating the x and y state when it changes, and second is implementing the scrollTo function. Focus on the scroll event first.

Because listening to the scroll event has to do with the layout of the browser, you'll want to set up the event listener inside of useLayoutEffect.

React.useLayoutEffect(() => {
  const handleScroll = () => {
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
Then inside of handleScroll you can update x and y with window.scrollX and window.scrollY.

const handleScroll = () => {
  setState({ x: window.scrollX, y: window.scrollY });
};
Hint #2 scrollTo
The scrollTo function you're going to return to the consumer of useWindowScroll should use the same API as window.scrollTo. This means it can either take in two numeric arguments or an options object.

scrollTo(x, y);
scrollTo({ top, left, behavior })
Regardless, scrollTo should detect which type of arguments it's receiving and call window.scrollTo appropriately. Because scrollTo can accept two integers or an object, try using the spread operator to make the conditional statements a little easier to handle.

const scrollTo = (...args) => {
 
}
Now args will be an array. If the first item in the array is an object, you can assume it received an options object. If the first two items in the array are numbers, you can assume it received coordinates.

const scrollTo = (...args) => {
  if (typeof args[0] === "object") {

  } else if (typeof args[0] === "number" && typeof args[1] === "number") {

  } else {
    throw new Error(
      `Invalid arguments passed to scrollTo`
    );
  }
};
Now not only have you validated the arguments, but it's simple to call window.scrollTo.

const scrollTo = (...args) => {
  if (typeof args[0] === "object") {
    window.scrollTo(args[0]);
  } else if (typeof args[0] === "number" && typeof args[1] === "number") {
    window.scrollTo(args[0], args[1]);
  } else {
    throw new Error(
      `Invalid arguments passed to scrollTo`
    );
  }
};
The only other thing you'll want to remember is whenever you return a function from a custom hook, you'll most likely want to memoize it so you won't invalidate any React.memos that the consumer of that function has.

const scrollTo = React.useCallback((...args) => {
  if (typeof args[0] === "object") {
    window.scrollTo(args[0]);
  } else if (typeof args[0] === "number" && typeof args[1] === "number") {
    window.scrollTo(args[0], args[1]);
  } else {
    throw new Error(
      `Invalid arguments passed to scrollTo`
    );
  }
}, []);