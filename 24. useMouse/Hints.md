Hint #1
The first thing you'll want to do is set up the mousemove event listener. Because we're dealing with the position of the mouse, you'll want to use useLayoutEffect to ensure that the event listener is set up before the browser repaints the screen.

React.useLayoutEffect(() => {
  const handleMouseMove = (event) => {
    
  };

  document.addEventListener("mousemove", handleMouseMove);

  return () => {
    document.removeEventListener("mousemove", handleMouseMove);
  };
}, []);
Hint #2
The first item in the object that useMouse returns has the following shape – 

{
  x: number,
  y: number,
  elementX: number,
  elementY: number,
  elementPositionX: number,
  elementPositionY: number
}
Before you worry about the element-specific properties, first update the x and y properties which is just the mouse position relative to the entire document.

To do this, you can use the pageX and pageY properties of the event object that's passed to the handleMouseMove event handler.

React.useLayoutEffect(() => {
  const handleMouseMove = (event) => {
    let newState = {
      x: event.pageX,
      y: event.pageY
    };

    setState((s) => {
      return {
        ...s,
        ...newState
      };
    });
  };

  document.addEventListener("mousemove", handleMouseMove);

  return () => {
    document.removeEventListener("mousemove", handleMouseMove);
  };
}, []);
Hint #3
Part of what makes useMouse interesting is not only does it give you the mouse position relative to the document, but if you attach the returned ref to an element, it'll also give you mouse position information relative to that element. Specifically, it'll give you the following values – 

elementX: The mouse position relative to the element's left edge. elementY: The mouse position relative to the element's top edge. elementPositionX: The element's position relative to the entire document. elementPositionY: The element's position relative to the entire document.

The first step in accomplishing this is checking to see if the ref has been attached to an element. To do this, you can check if ref.current is truthy and if ref.current.nodeType is equal to Node.ELEMENT_NODE.

If you're unfamiliar, ref.current.nodeType will give you the type of node that the ref is attached to. In this case, since we're only interested in elements, we compare that to Node.ELEMENT_NODE which is DOM constant that represents the node type of an element node.

React.useLayoutEffect(() => {
  const handleMouseMove = (event) => {
    let newState = {
      x: event.pageX,
      y: event.pageY
    };

    if (ref.current && ref.current.nodeType === Node.ELEMENT_NODE) {
      
    }

    setState((s) => {
      return {
        ...s,
        ...newState
      };
    });
  };

  document.addEventListener("mousemove", handleMouseMove);

  return () => {
    document.removeEventListener("mousemove", handleMouseMove);
  };
}, []);
From there you'll want to get the left and top position of the element. To do that, you can use the getBoundingClientRect method.

React.useLayoutEffect(() => {
  const handleMouseMove = (event) => {
    let newState = {
      x: event.pageX,
      y: event.pageY
    };

    if (ref.current && ref.current.nodeType === Node.ELEMENT_NODE) {
      const { left, top } = ref.current.getBoundingClientRect();

    }

    setState((s) => {
      return {
        ...s,
        ...newState
      };
    });
  };

  document.addEventListener("mousemove", handleMouseMove);

  return () => {
    document.removeEventListener("mousemove", handleMouseMove);
  };
}, []);
Once you have the top and left position of the element, you can add the window.scrollX and window.scrollY values to get the element's position relative to the entire document.

React.useLayoutEffect(() => {
  const handleMouseMove = (event) => {
    let newState = {
      x: event.pageX,
      y: event.pageY
    };

    if (ref.current && ref.current.nodeType === Node.ELEMENT_NODE) {
      const { left, top } = ref.current.getBoundingClientRect();
      const elementPositionX = left + window.scrollX;
      const elementPositionY = top + window.scrollY;

    }

    setState((s) => {
      return {
        ...s,
        ...newState
      };
    });
  };

  document.addEventListener("mousemove", handleMouseMove);

  return () => {
    document.removeEventListener("mousemove", handleMouseMove);
  };
}, []);
And from there, getting the values we need is basic math.

React.useLayoutEffect(() => {
  const handleMouseMove = (event) => {
    let newState = {
      x: event.pageX,
      y: event.pageY
    };

    if (ref.current && ref.current.nodeType === Node.ELEMENT_NODE) {
      const { left, top } = ref.current.getBoundingClientRect();
      const elementPositionX = left + window.scrollX;
      const elementPositionY = top + window.scrollY;
      const elementX = event.pageX - elementPositionX;
      const elementY = event.pageY - elementPositionY;

      newState.elementX = elementX;
      newState.elementY = elementY;
      newState.elementPositionX = elementPositionX;
      newState.elementPositionY = elementPositionY;
    }

    setState((s) => {
      return {
        ...s,
        ...newState
      };
    });
  };

  document.addEventListener("mousemove", handleMouseMove);

  return () => {
    document.removeEventListener("mousemove", handleMouseMove);
  };
}, []);