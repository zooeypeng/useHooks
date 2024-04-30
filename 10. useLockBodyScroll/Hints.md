Hint #1
The first thing useLockBodyScroll should do is prevent the user from scrolling the page. To do that, you can set the overflow CSS property on the body element to hidden. Because this is a side effect that depends on layout information, you'll want to do that inside of useLayoutEffect.

import * as React from "react";

export default function useLockBodyScroll() {
  React.useLayoutEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);
}


Hint #2
Once the component using useLockBodyScroll has been removed from the DOM, you'll want to reset the overflow property back to its original value.

To do that, try storing the original overflow value in a variable (which you can get with window.getComputedStyle), and then in the effect's cleanup function, set the overflow property back to that value.