Bruno Alves
2 months ago

A question a bit unrelated to the challenge at hand. We're creating a new event using:

const dispatchStorageEvent = (key, newValue) => {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
};

const setItem = (key, value) => {
  const stringifiedValue = JSON.stringify(value);
  window.sessionStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
};
I'm having a bit of trouble why we would want to create and dispatch an event automatically here. I'm not super familiar with this API or it's use with React. Is it because we don't want to wait until React's next render to evoke our callback?

Tyler McGinnis
2 months ago

I actually answer a similar question (just about useLocalStorage) in another thread.

It has to do with having two instances of the app running and keeping them in sync (and not React).