useIsClient is useful for determining if it's safe to run certain client-only hooks like useMediaQuery or useLocalStorage. It returns a boolean determining if React's useEffect hook has finished running (which means the app is being rendered on the client).

const isClient = useIsClient();
For the full documentation, see usehooks.com/useisclient.

TASKS
useIsClient should return a boolean value
useIsClient should return true if the app is being rendered on the client
useIsClient should return false if the app is not being rendered on the client