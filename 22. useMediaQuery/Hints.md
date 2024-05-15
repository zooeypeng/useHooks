Hint #1
Because you're synchronizing your component with state that the browser is already controlling, you'll want to use React's useSyncExternalStore hook to implement useMediaQuery.

useSyncExternalStore takes in three arguments: subscribe, getSnapshot, and getServerSnapshot.

import * as React from "react";

export default function useMediaQuery(query) {
  const subscribe = React.useCallback(() => {

  });

  const getSnapshot = () => {

  };

  const getServerSnapshot = () => {

  };

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
Hint #2
The heavy lifting of this hook will be done using the browser's matchMedia API. This API allows you to pass in a media query string (like only screen and (max-width: 768px)) and returns an object with a matches property that will be true if the document's dimensions match.

const mm = window.matchMedia("only screen and (max-width: 768px)");

mm.matches // true | false
You can also subscribe to changes on the document's dimensions using matchMedia like this:

mm.addEventListener("change", () => {})
Hint #3
Now if we combine the previous hint with your knowledge of useSyncExternalStore, we're left with a subscribe function that looks like this:

const subscribe = (callback) => {
  const matchMedia = window.matchMedia(query);

  matchMedia.addEventListener("change", callback);

  return () => {
    matchMedia.removeEventListener("change", callback);
  };
}
This works, but if we want to access query via closure scope as we're currently doing, we have to keep subscribe inside of the component and therefore, we need to make sure we memoize it using React's useCallback function so useSyncExternalStore doesn't unsubscribe and resubscribe to the store on every render.

const subscribe = React.useCallback((callback) => {
  const matchMedia = window.matchMedia(query);

  matchMedia.addEventListener("change", callback);
  return () => {
    matchMedia.removeEventListener("change", callback);
  };
}, [query]);
Hint #3
Now what you return from getSnapshot will be what gets returned from useMediaQuery.

const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");
As they example shows, we want to return a boolean value that represents whether or not the document's dimensions match the media query string. As we saw in Hint #2, we can use the matches property for this.

const getSnapshot = () => {
  return window.matchMedia(query).matches;
};
Hint #4
Just to be sure no one is running this hook on the server (where window is undefined), we also can throw an error in getServerSnapshot. This isn't necessary, but it does provide a better UX than leaving it out.

const getServerSnapshot = () => {
  throw Error("useMediaQuery is a client-only hook");
};