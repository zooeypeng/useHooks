Hint #1 – overview
You're given everything except the hard parts, start and cancel. You can break each function down into having the following responsibilities.

start:

Using isMouseEvent and isTouchEvent, verify the event is either a mouse event or a touch event
Invoke the onStart callback if it exists
Keep track of whether the user is pressing down on the element
Set a timer to invoke the callback after the threshold has passed
Keep track of whether the user has long pressed the element
cancel:

Using isMouseEvent and isTouchEvent, verify the event is either a mouse event or a touch event
If the user has long pressed the element, invoke the onFinish callback if it exists
If the user has not long pressed the element, invoke the onCancel callback if it exists
If a timer has been set in start, clear it
You'll need to rely on refs in order to keep track of whether the user is pressing down on the element, whether the user has long pressed the element, and the timer id.

const isPressed = React.useRef(false);
const isLongPressActive = React.useRef(false);
const timerId = React.useRef();
Hint #2 – start
As a reminder, start is responsible for the following:

Using isMouseEvent and isTouchEvent, verify the event is either a mouse event or a touch event
Invoke the onStart callback if it exists
Keep track of whether the user is pressing down on the element
Set a timer to invoke the callback after the threshold has passed
Keep track of whether the user has long pressed the element
First, you'll need to verify that the event is either a mouse event or a touch event. You can use the isMouseEvent and isTouchEvent functions to do this.

const start = (event) => {
  if (!isMouseEvent(event) && !isTouchEvent(event)) return;

};
Next you'll want to invoke onStart if it exists.

const start = (event) => {
  if (!isMouseEvent(event) && !isTouchEvent(event)) return;

  if (onStart) {
    onStart(event);
  }
};
Next, keep track of whether the user is pressing down on the element. You can store this in the isPressed ref.

const start = (event) => {
  if (!isMouseEvent(event) && !isTouchEvent(event)) return;

  if (onStart) {
    onStart(event);
  }

  isPressed.current = true;
};
Finally, you'll want to set a timer to invoke callback after the threshold has passed and keep track of whether the user has long pressed the element – you can store this in the isLongPressActive ref.

const start = (event) => {
  if (!isMouseEvent(event) && !isTouchEvent(event)) return;

  if (onStart) {
    onStart(event);
  }

  isPressed.current = true;
  timerId.current = setTimeout(() => {
    callback(event);
    isLongPressActive.current = true;
  }, threshold);
};
Hint #3 – cancel
As a reminder, cancel is responsible for the following:

Using isMouseEvent and isTouchEvent, verify the event is either a mouse event or a touch event
If the user has long pressed the element, invoke the onFinish callback if it exists
If the user has not long pressed the element, invoke the onCancel callback if it exists
If a timer has been set in start, clear it
First, you'll need to verify that the event is either a mouse event or a touch event. You can use the isMouseEvent and isTouchEvent functions to do this.

const cancel = (event) => {
  if (!isMouseEvent(event) && !isTouchEvent(event)) return;

};
If the user has long pressed the element, invoke the onFinish callback if it exists

const cancel = (event) => {
  if (!isMouseEvent(event) && !isTouchEvent(event)) return;

  if (isLongPressActive.current) {
    if (onFinish) {
      onFinish(event);
    }
  }
};
If the user has not long pressed the element, invoke the onCancel callback if it exists

const cancel = (event) => {
  if (!isMouseEvent(event) && !isTouchEvent(event)) return;

  if (isLongPressActive.current) {
    if (onFinish) {
      onFinish(event);
    }
  } else if (isPressed.current) {
    if (onCancel) {
      onCancel(event);
    }
  }
};
And finally, if a timer has been set, clear it. You'll also want to reset the isLongPressActive and isPressed refs.

const cancel = (event) => {
  if (!isMouseEvent(event) && !isTouchEvent(event)) return;

  if (isLongPressActive.current) {
    if (onFinish) {
      onFinish(event);
    }
  } else if (isPressed.current) {
    if (onCancel) {
      onCancel(event);
    }
  }

  isLongPressActive.current = false;
  isPressed.current = false;

  if (timerId.current) {
    window.clearTimeout(timerId.current);
  }
};