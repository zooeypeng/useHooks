import * as React from "react";

export default function useGeolocation(options = {}) {
  const [state, setState] = React.useState({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null,
    error: null,
  });

  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    const onEvent = ({ coords, timestamp }) => {
      setState({
        timestamp,
        error: null,
        loading: false,
        latitude: coords.latitude,
        longitude: coords.longitude,
        altitude: coords.altitude,
        accuracy: coords.accuracy,
        altitudeAccuracy: coords.altitudeAccuracy,
        heading: coords.heading,
        speed: coords.speed,
      });
    };

    const onEventError = (error) => {
      setState((s) => ({
        ...s,
        loading: false,
        error,
      }));
    };

    navigator.geolocation.getCurrentPosition(
      onEvent,
      onEventError,
      optionsRef.current
    );

    const watchId = navigator.geolocation.watchPosition(
      onEvent,
      onEventError,
      options
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  return state;
}
