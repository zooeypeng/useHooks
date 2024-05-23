Can someone help me understand this?

If I leave the subscribe blank, the app still behaves the same. I was expecting with it commented out, the store won't get updated, the drawing won't get updated in App.js, the useEffect in App.js won't get rerun, hence the drawing wont' get updated in the canvas. But it is not the case. Without subscribe, everything seems to work the same.

Really appreciate any help. Thank you!


Avatar for Tyler McGinnis
Tyler McGinnis
2 months ago

It's a little confusing because you can't see the benefits of subscribe inside of our sandboxed environment.

All the subscribe/dispatchEvent stuff is for making it so whenever localStorage is updated, if there's another version of the app running in the browser (most likely in another tab), then that version of the app will also update the store.

That's why subscribe is adding an event listener to the storage event and in setItem we're calling dispatchStorageEvent which runs this line

window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
That way we just make sure that any app running in your browser that is listening to storage will be updated.