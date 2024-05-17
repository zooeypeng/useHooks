Ryan Schumacher
6 months ago

This one was really confusing for me. Wont eventOptions have a different reference each render (since it's an object)? Doesnt that mean this effect will always run? (It doesnt, so my understanding somewhere is off).

The number of hooks we have to implement that use useEffectEvent seems disproportional to how much material there was on useEffectEvent in the course. I feel like my understanding of useEffectEvent remains very poor as a result.

At this point in the course I am feeling pretty discouraged to be honest - I dont think I've written a single hook without looking at a hint or doing extensive googling. I also am eager to get to the "Interview Questions" part of the course since that was my main reason for buying it - I hope that can be released soon.

As a final point of feedback, it's mildly infuriating that comments clear when the user changes tabs here. I oftentimes find myself writing a comment, going back to the hint / solution, and coming back to find it totally cleared. I had to rewrite this comment twice :(


Avatar for Tyler McGinnis
Tyler McGinnis
6 months ago

Have you looked at the solution video for this one? It goes into your first question about eventOptions.

To your other points, I wouldn't expect someone to be able to build all of the hooks without looking at hints. You're building a pretty advanced hooks library. I wouldn't expect most React devs, regardless of experience, to be able to do it alone. Also the usage of useEffectEvent is disproportional again because you're building a library. In a real app, it's usage would be much smaller because you're not as worried about referential equality.


RS
Ryan Schumacher
6 months ago

The thing that I dont get is that in a previous lesson it was mentioned that:

{} === {} evaluates to false because object references are compared, not the values.

Here, eventOptions is an object. When react.UseEffect is checking if the effect should run, doesnt it compare referential equality? Won't eventOptions have a different reference on each render unless we memoize it?


Avatar for Tyler McGinnis
Tyler McGinnis
6 months ago

Yes, and the effect will re-apply. This was a design decision with this particular hook. There might be a scenario where the user will want to change the eventOptions between renders. In that scenario, the effect should re-run. I talk about in the solution video how they'd be able to opt out of this behavior by memoizing eventOptions.

The tricky part with building a hooks library is you have to make a decision about what the user might reasonably want to change between renders (like eventOptions, in this example) and what wouldn't be reasonable to change (cb, in this example).

If you put everything inside of useEffectEvent, the effect will never re-run, even if the consumer of the hook needed it to. And vice versa, if you don't put anything inside of useEffectEvent, then you might be causing unnecessary re-renders. Tradeoffs.

But I think you're understanding is better than you're giving yourself credit for, it just gets a little weird around the edges like this hook.

See More


👍
2
EL
Evert Lagerberg
2 months ago

I think another problem with so many hooks "solutions" using useEffectEvent is that the feature is still in alpha. So, in a real-world code base, we will likely not be allowed to use it, right? It would be interesting to see an example of building this hook without using useEffectEvent.


Avatar for Tyler McGinnis
Tyler McGinnis
2 months ago

You usually do something (hacky) like this where you stick the callback in a ref so you can include it inside of the effect without React getting mad.

import * as React from "react";

export default function useKeyPress(key, cb, options = {}) {
  const { event = "keydown", target = window ?? null, eventOptions } = options;
  const cbRef = React.useRef(cb);

  React.useEffect(() => {
    const handler = (event) => {
      if (event.key === key) {
        cbRef.current(event);
      }
    };

    target.addEventListener(event, handler, eventOptions);

    return () => {
      target.removeEventListener(event, handler, eventOptions);
    };
  }, [key, target, event, eventOptions]);
}