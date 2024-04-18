usePreferredLanguage returns a string that represents the preferred language of the user, as set in the browser settings. You can get access to their preferred language via navigator.language. You can listen to changes to the preferred language by adding an event listener for the languagechange event.

const language = usePreferredLanguage()
TASKS
usePreferredLanguage should return the user's preferred language as a string
usePreferredLanguage should listen for changes to the user's preferred language and update the return value accordingly
usePreferredLanguage should unsubscribe from the languagechange event when the component that uses usePreferredLanguage is removed from the DOM
usePreferredLanguage should throw an error if it's used on the server
