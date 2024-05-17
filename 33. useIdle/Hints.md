Hint #1
Before worrying about how the event listeners change things, try starting out with something more basic. After ms milliseconds, change idle to true.

export default function useIdle(ms = 1000 * 20) {
  const [idle, setIdle] = React.useState(false);

  React.useEffect(() => {
    const handleTimeout = () => {
      setIdle(true);
    };

    const timeoutId = window.setTimeout(handleTimeout, ms);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [ms]);

  return idle;
}
Hint #2
Whenever there's a mousemove, mousedown, resize, keydown, touchstart, wheel, you'll want to reset the timeout. To do that, try moving the timeoutId variable to the top of the effect, then, inside the event handler for your events, clear the timeout and set a new one.

From a high level, you can think of it like this. Whenever any of those events occur, the user is no longer idle and the amount of time until they are idle again is reset to ms milliseconds.

export default function useIdle(ms = 1000 * 20) {
  const [idle, setIdle] = React.useState(false);

  React.useEffect(() => {
    let timeoutId;

    const handleTimeout = () => {
      setIdle(true);
    };

    const handleEvent = () => {
      setIdle(false);

      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(handleTimeout, ms);
    };

    timeoutId = window.setTimeout(handleTimeout, ms);

    window.addEventListener("mousemove", handleEvent);
    window.addEventListener("mousedown", handleEvent);
    window.addEventListener("resize", handleEvent);
    window.addEventListener("keydown", handleEvent);
    window.addEventListener("touchstart", handleEvent);
    window.addEventListener("wheel", handleEvent);

    return () => {
      window.removeEventListener("mousemove", handleEvent);
      window.removeEventListener("mousedown", handleEvent);
      window.removeEventListener("resize", handleEvent);
      window.removeEventListener("keydown", handleEvent);
      window.removeEventListener("touchstart", handleEvent);
      window.removeEventListener("wheel", handleEvent);
      window.clearTimeout(timeoutId);
    };
  }, [ms]);

  return idle;
}
Hint #3
You'll also want to listen for the visibilitychange event. However, unlike the other events, this event is listened to on the document, not the window. Whenever the document is no longer hidden, you'll want to reset the timeout and set idle to false.

import * as React from "react";

export default function useIdle(ms = 1000 * 20) {
  const [idle, setIdle] = React.useState(false);

  React.useEffect(() => {
    let timeoutId;

    const handleTimeout = () => {
      setIdle(true);
    };

    const handleEvent = () => {
      setIdle(false);

      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(handleTimeout, ms);
    });

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        handleEvent();
      }
    };

    timeoutId = window.setTimeout(handleTimeout, ms);

    window.addEventListener("mousemove", handleEvent);
    window.addEventListener("mousedown", handleEvent);
    window.addEventListener("resize", handleEvent);
    window.addEventListener("keydown", handleEvent);
    window.addEventListener("touchstart", handleEvent);
    window.addEventListener("wheel", handleEvent);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("mousemove", handleEvent);
      window.removeEventListener("mousedown", handleEvent);
      window.removeEventListener("resize", handleEvent);
      window.removeEventListener("keydown", handleEvent);
      window.removeEventListener("touchstart", handleEvent);
      window.removeEventListener("wheel", handleEvent);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.clearTimeout(timeoutId);
    };
  }, [ms]);

  return idle;
}
Hint #4
At this point your app is working, but there's a small performance problem. You'll notice that you're given a throttle function. We only ever want to call handleEvent if it's been at least 500 milliseconds since the last time it was called. This will prevent the event handler from being called too many times in a short period of time.

const handleEvent = throttle(() => {
  setIdle(false);

  window.clearTimeout(timeoutId);
  timeoutId = window.setTimeout(handleTimeout, ms);
}, 500);