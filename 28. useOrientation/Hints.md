Hint #1 – screen.orientation
Before you worry about the fallback to orientationchange, first take care of listening to change on screen.orientation. Because you're dealing with layout information, you'll want to put the event handler inside of useLayoutEffect.

React.useLayoutEffect(() => {
  const handleChange = () => {
    
  };

  if (window.screen?.orientation) {
    handleChange();
    window.screen.orientation.addEventListener("change", handleChange);
  }

  return () => {
    if (window.screen?.orientation) {
      window.screen.orientation.removeEventListener("change", handleChange);
    }
  };
}, [])
Now all you need to do is update the state with the device's orientation information whenever handleChange is invoked. To do that, you can use window.screen.orientation to get both the angle and the type.

const handleChange = () => {
  const { angle, type } = window.screen.orientation;

  setOrientation({
    angle,
    type
  });
};
Hint #2 – orientationchange
If the browser doesn't support screen.orientation, you'll need to listen to orientationchange on the window object instead. You can use the same strategy used in Hint #1 and set up your event handlers first.

React.useLayoutEffect(() => {
  const handleChange = () => {
    const { angle, type } = window.screen.orientation;
    setOrientation({
      angle,
      type
    });
  };

  const handle_orientationchange = () => {
    
  };

  if (window.screen?.orientation) {
    handleChange();
    window.screen.orientation.addEventListener("change", handleChange);
  } else {
    handle_orientationchange();
    window.addEventListener("orientationchange", handle_orientationchange);
  }

  return () => {
    if (window.screen?.orientation) {
      window.screen.orientation.removeEventListener("change", handleChange);
    } else {
      window.removeEventListener(
        "orientationchange",
        handle_orientationchange
      );
    }
  };
}, []);
Now all you need to do is update the state with the device's orientation information whenever handle_orientationchange is invoked. To do that, you can use window.orientation to get the angle and set type to UNKNOWN.

const handle_orientationchange = () => {
  setOrientation({
    type: "UNKNOWN",
    angle: window.orientation
  })
};