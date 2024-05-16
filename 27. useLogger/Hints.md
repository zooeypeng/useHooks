Hint #1
There are three scenarios where we want to log something to the console.

On the initial render of the component
When the component is updated
When the component is removed from the DOM
Focus on #1 and #3 for now since they go together.

The first thing you'll want to do is use the rest operator to grab all of the arguments besides the first one.

import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useLogger(name, ...rest) {
  
}
What makes it tricky from here is that you'll need to log rest inside of your useEffect, but since it's a reactive value, you'll need to include it in your dependency array. Of course, this isn't what you want since you only want to log on the initial render and when the component is removed from the DOM. To get around this, you can use React's useEffectEvent hook to abstract the reactive but non-synchronizing value out of useEffect.

const handleLog = React.useEffectEvent((event) => {
  console.log(`${name} ${event}:`, rest);
});
From there, you can use handleLog inside of useEffect without needing to include it in the dependency array.

import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useLogger(name, ...rest) {
  const handleLog = React.useEffectEvent((event) => {
    console.log(`${name} ${event}:`, rest);
  });

  React.useEffect(() => {
    handleLog("mounted");

    return () => {
      handleLog("unmounted");
    };
  }, []);
}
Hint #2
Next you'll need to invoke handleLog whenever the component is updated. This is a little trickier than you might imagine. Basically you need another effect that runs after every render, but doesn't log on the initial render. To do this, you can use a ref to determine if the component is on the initial render or not. If it's not, then you'll log.

import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useLogger(name, ...rest) {
  const initialRenderRef = React.useRef(true);

  const handleLog = React.useEffectEvent((event) => {
    console.log(`${name} ${event}:`, rest);
  });

  React.useEffect(() => {
    if (initialRenderRef.current === false) {
      handleLog("updated");
    }
  });

  React.useEffect(() => {
    handleLog("mounted");
    initialRenderRef.current = false;

    return () => {
      handleLog("unmounted");
      initialRenderRef.current = true;
    };
  }, []);
}