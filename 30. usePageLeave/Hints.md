Hint #1 – relatedTarget
The biggest question you probably have is how to detect if the user has moused out of the current page. There's not a great way to do this, admittedly. But here's some logic you can use in your event handler.

const to = event.relatedTarget || event.toElement;
if (!to || to.nodeName === "HTML") {
  // they've moused out of the page
}
Hint #2
What makes this challenge tricky is that you need to set up an event listener inside of useEffect, but you also need to access the cb argument inside of that event handler. You may have tried something like this – 

React.useEffect(() => {
  const onLeave = () => {
    const to = event.relatedTarget || event.toElement;
    if (!to || to.nodeName === "HTML") {
      cb()
    }
  }

  document.addEventListener("mouseout", onLeave);

  return () => {
    document.removeEventListener("mouseout", onLeave);
  };
}, [cb]);
The problem with this is that cb is both a reactive value and a reference value. This means you need to include it in useEffect's dependency array, but if you, and the consumer of usePageLeave doesn't memoize it, you'll be creating and destroying a new event listener on every render.

This is a good use case for React's useEffectEvent hook. By abstracting the logic for our event handler into useEffectEvent, we can use it inside of useEffect without needing to include cb in the dependency array.

import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function usePageLeave(cb) {
  const onLeave = React.useEffectEvent((event) => {
    const to = event.relatedTarget || event.toElement;
    if (!to || to.nodeName === "HTML") {
      cb();
    }
  });

  React.useEffect(() => {
    document.addEventListener("mouseout", onLeave);

    return () => {
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);
}