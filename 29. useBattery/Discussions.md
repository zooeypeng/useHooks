Adrian
2 months ago

Why not to set supported and loading already while passing initial state to useState? Something like:

  const [state, setState] = React.useState({
    supported: Boolean(navigator.getBattery),
    loading: Boolean(navigator.getBattery),
    level: null,
    charging: null,
    chargingTime: null,
    dischargingTime: null,
  });
Is it because we are taking into account ssr?



👍
3
Avatar for Tyler McGinnis
Tyler McGinnis
2 months ago

Correct. As a library, you can't assume the environment in which this hook is running has access to navigator. Which is why we check for its existence where it's safe (in useEffect which will only run on the client).