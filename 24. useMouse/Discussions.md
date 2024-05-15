Albert Chang
6 months ago

The answer can be simplified a bit by using clientX/clientY instead of pageX/pageY, that way we don't have to add window.scrollX/window.scrollY to elementPositionX/Y. Although the tests do not mock clientX/clientY so they are undefined.



👍
3
Avatar for Jan Szejko 
Jan Szejko
5 months ago

Yes, it's really frustrating when the tests are brittle and don't accept correct solutions.


Avatar for Ben Adam
Ben Adam
5 months ago

Hey Jan, sorry for the frustration. Since we are running these tests in a sandbox environment its nearly impossible to mock every possible combination. Perhaps in the future we will move to a solution that runs the tests in a real browser for better accuracy, but the goal of these challenges is to solidify the conceptual knowledge from the lesson. That being said, if you run into a flakey test, just let us know and we will do our best to patch the issue asap.