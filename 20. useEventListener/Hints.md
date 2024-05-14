Hint #1
This one seems like it would be harder than it is. The key is in understanding how how addEventListener works.

If you're unfamiliar, here's the signature.

targetElement.addEventListener(eventName, onEvent, options);
and then you remove the event listener like this.

targetElement.removeEventListener(eventName, onEvent, options);
Hint #2
The trickiest part of useEventListener is that handler is a reference value, but you need to use it inside of useEffect. If you included it in the dependency array without it being memoized, you'd be creating and removing the event listener on every render.

To get around this, you can abstract handler into React's useEffectEvent hook. From there you can use it in useEffect without needing to include it in the dependency array.

const onEvent = React.useEffectEvent(handler);
Hint #3
Remember the signature of addEventListener – 

targetElement.addEventListener(eventName, onEvent, options);
You can use the exact same code inside of your effect (after you've done some checks to make sure the target element exists).

React.useEffect(() => {
  const targetElement = target.current ?? target;

  if (!targetElement?.addEventListener) return;

  targetElement.addEventListener(eventName, onEvent, options);

  return () => {
    targetElement.removeEventListener(eventName, onEvent, options);
  };
}, [target, eventName, options]);