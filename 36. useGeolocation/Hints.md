Hint #1
In order to get the user's current position, you can use the browser's navigator.geolocation.getCurrentPosition API.

Here's how it works. It takes in three arguments: a success callback, an error callback, and an options object.

navigator.geolocation.getCurrentPosition(
  onEvent,
  onEventError,
  options
)
The success callback (which we're calling onEvent) takes in a Position object which contains the user's current position information in two properties, coords and timestamp.

const onEvent = ({ coords, timestamp }) => {}
Those map to our hook's state like this.

timestamp,
latitude: coords.latitude,
longitude: coords.longitude,
altitude: coords.altitude,
accuracy: coords.accuracy,
altitudeAccuracy: coords.altitudeAccuracy,
heading: coords.heading,
speed: coords.speed,
The error callback (which we're calling onEventError) takes in a PositionError object.

const onEventError = (error) => {}
You can stick that error object directly on the hooks state as error.

The options object is an optional parameter that the user can pass in when they invoke useGeolocation. If they pass it in, you'll want to pass it along to getCurrentPosition.

Hint #2
In order to listen for changes in the user's location, you'll want to use the browser's navigator.geolocation.watchPosition API. Similar to getCurrentPosition, it takes in three arguments: a success callback, an error callback, and an options object. Those three behave the same as they do in getCurrentPosition. The only difference is that watchPosition returns a watchId that you can use to clear the listener when the component using useGeolocation is removed from the DOM.

const watchId = navigator.geolocation.watchPosition(
  onEvent,
  onEventError,
  options
);

...

navigator.geolocation.clearWatch(watchId);
Hint #3
You may be struggling with how to get the options object into useEffect without requiring the user to memoize it so it doesn't trigger the effect on every render (since it's a reference value). It feels hacky, but the standard way to do this is to put the object in a ref and then you can access that ref inside the effect without needing to include it in useEffect's dependency array.

const optionsRef = React.useRef(options);

React.useEffect(() => {
  ...

  navigator.geolocation.getCurrentPosition(
    onEvent,
    onEventError,
    optionsRef.current
  );

  const watchId = navigator.geolocation.watchPosition(
    onEvent,
    onEventError,
    optionsRef.current
  );

  ...
})