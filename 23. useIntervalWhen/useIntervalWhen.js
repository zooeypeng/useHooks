import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useIntervalWhen(cb, { ms, when, startImmediately }) {
  const onTick = React.useEffectEvent(cb);
  const id = React.useRef(null);
  const immediatelyCalled = React.useRef(
    startImmediately === true ? false : null
  );

  const handleClearInterval = React.useCallback(() => {
    window.clearInterval(id.current);
  }, []);

  React.useEffect(() => {
    if (when === true) {
      id.current = window.setInterval(onTick, ms);

      if (startImmediately === true && immediatelyCalled.current === false) {
        onTick();
        immediatelyCalled.current = true;
      }

      return handleClearInterval;
    }
  }, [when, ms, handleClearInterval, startImmediately]);

  return handleClearInterval;
}
