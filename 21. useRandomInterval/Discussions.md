kiing kiu hwang
7 months ago

what is the point to use setTimeout instead of useInterval ?


Avatar for Tyler McGinnis
Tyler McGinnis
7 months ago

We're not really creating an interval, even though that's the name of the hook. Instead, we're recursively creating timeouts. Try to use useInterval and let me know how it goes.


--


Daniele
7 months ago

I got confused with the tick() function. Why not use setInterval instead? It passed the tests

React.useEffect(() => {
    id.current = window.setInterval(
      callback,
      getRandomNumber(minDelay, maxDelay)
    );

    return clear;
  }, [minDelay, maxDelay]);


  Albert Chang
7 months ago

I think in this case the interval doesn't change. getRandomNumber only gets called once instead of multiple times like the solution.


2
Avatar for Tyler McGinnis
Tyler McGinnis
7 months ago

Albert is correct. The correct solution invoked callback at a random interval, not the same interval every time.
