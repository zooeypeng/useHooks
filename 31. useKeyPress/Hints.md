Hint #1 – addEventListener
This challenge would be quite difficult if you weren't familiar with the keydown event and how to add event listeners in JavaScript. Here's how it works:

target.addEventListener(event, handler, eventOptions);
and to remove the event listener – 

target.removeEventListener(event, handler, eventOptions);
So for example, if you wanted to add an event listener for the keydown event with window as the target, you can do this:

window.addEventListener("keydown", handler, options);

...

window.removeEventListener("keydown", handler, options)
Hint #2 – useEffectEvent
What makes this code tricky is you need to reference cb inside of useEffect, but it has nothing to do with synchronizing the component and shouldn't need to be in the dependency array.

To get around this problem, you can use React's useEffectEvent to abstract cb away from useEffect and allow you to reference it inside of useEffect without having to include it in the dependency array.

const onListen = React.useEffectEvent(cb)
Hint #3 – event listeners
Now you'll want to try setting up the event listener. You already have the target, event, and eventOptions. Now you'll just need to call addEventListener inside of your effect and clean it up when appropriate.

import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useKeyPress(key, cb, options = {}) {
  const { event = "keydown", target = window ?? null, eventOptions } = options;
  const onListen = React.useEffectEvent(cb);

  React.useEffect(() => {
    const handler = (event) => {
      
    };

    target.addEventListener(event, handler, eventOptions);

    return () => {
      target.removeEventListener(event, handler, eventOptions);
    };
  }, [key, target, event, eventOptions]);
}
One question you may have is when to include a reference value in the dependency array (like eventOptions) and when to abstract it to useEffectEvent. This is a tricky question and you'll need to use your best judgement. In this hook, there may be when scenario when the user would want to change the eventOptions and re-apply the effect. I figure it's better to give the user that options (with the ability to memoize the object if they'd like to opt out of that behavior) than make a wrong assumption and leave them no choice.

Hint #4 – handler
Now the only thing to do is finish the logic for the handler that's invoked whenever the event occurs.

What you'll want to do here is if event.key matches the key argument, then you'll want to invoke onListen passing it the event.

const handler = (event) => {
  if (event.key === key) {
    onListen(event);
  }
};