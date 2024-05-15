brandung GmbH
7 months ago

Why did you use useCallback for the subscribe function but not for getSnapshot. Aren't both using query?



👍
2
RS
Ryan Schumacher
6 months ago

I had the same question too - looking at the official documentation I see (under Caveats)

If a different subscribe function is passed during a re-render, React will re-subscribe to the store using the newly passed subscribe function. You can prevent this by declaring subscribe outside the component.
I see nothing about getSnapshot having this caveat, so seems unnecessary maybe?



👍
1
Avatar for Tyler McGinnis
Tyler McGinnis
6 months ago

As Ryan mentioned, it's because referential equality matters for subscribe, but not for getSnapshot. We didn't use useCallback on getSnapshot simply because we didn't need to.



👍
1
D
Doug
3 months ago

Is this difference (referential equality matters for subscribe but not getSnapshot) something we should have been able to infer, or just a matter of knowing the API?


Avatar for Tyler McGinnis
Tyler McGinnis
3 months ago

Knowing the API while being able to back into why they probably made that decision (it gives you the ability to unsubscribe by changing the reference if you need to).