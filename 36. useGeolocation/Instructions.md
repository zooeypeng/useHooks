useGeolocation provides a simple way to get access to the user's geolocation information using the Geolocation API.

It gets the user's current location with navigator.geolocation.getCurrentPosition and it watches the user's current location with navigator.geolocation.watchPosition.

const { 
  loading,
  accuracy,
  altitude,
  altitudeAccuracy,
  heading,
  latitude,
  longitude,
  speed,
  timestamp,
  error,
} = useGeolocation(options);
For the full documentation, see usehooks.com/usegeolocation.

TASKS
useGeolocation should return an object with the following properties: loading, accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed, timestamp, and error
useGeolocation should set the loading property to true on the initial render
Using getCurrentPosition, useGeolocation should get the user's current position and update its state accordingly
useGeolocation should update its state when the user's location changes
useGeolocation should set the error property when an error occurs
Using clearWatch, useGeolocation should clear any listeners it's set when the component is removed from the DOM
