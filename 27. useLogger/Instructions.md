useLogger is a hook that can be used in development to give you more insight into when your component renders and re-renders. Specifically, it logs the name you give it along with any arguments as well as if the component is on the initial render (mounted), being updated (updated), or about to be removed from the DOM (unmounted).

useLogger(name, arguments);
For the full documentation, see usehooks.com/uselogger.

TASKS
useLogger should log name, the event, and any arguments passed to it
useLogger should log mounted on the initial render of the component using useLogger
useLogger should log updated when the component using useLogger is updated
useLogger should log unmounted when the component using useLogger is removed from the DOM
useLogger should support multiple arguments