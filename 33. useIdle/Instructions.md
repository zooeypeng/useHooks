useIdle provides a simple way to know if the user has been idle or inactive. It defines "idle" by going a specified amount of time without any of the following events: mousemove, mousedown, resize, keydown, touchstart, wheel, and visibilitychange.

const userIsIdle = useIdle(ms);
For the full documentation, see usehooks.com/useidle.

TASKS
useIdle should take a ms argument that defaults to 1000 * 20 (20 seconds)
useIdle should return true if the user has been idle for ms milliseconds, otherwise it should return false
useIdle should listen for the following events: mousemove, mousedown, resize, keydown, touchstart, wheel, and visibilitychange
useIdle should reset its internal timer whenever any relevant event occurs
useIdle should clean up all event listeners when the component using useIdle is removed from the DOM