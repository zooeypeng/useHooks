useCountdown is a convenient way to create and manage a countdown timer. Every interval until endTime, onTick will be invoked. When endTime is reached, onComplete will be invoked and the timer will stop.

const count = useCountdown(endTime, {
  interval,
  onTick,
  onComplete,
});
For the full documentation, see usehooks.com/usecountdown.

TASKS
useCountdown should count down to endTime, call onTick every interval, call onComplete upon reaching endTime, and return a value that represents how much time is left until endTime
useCountdown should stop counting down and the timer's interval should be cleared when the component using useCountdown is removed from the DOM
useCountdown should return a count which is how many intervals are left until endTime