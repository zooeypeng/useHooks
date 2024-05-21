useFetch allows you to easily fetch data from a specified url using the browser's fetch API and provides a consistent pattern for handling success (data) and error states. It also incorporates an internal caching mechanism to store and retrieve previously fetched data as well as a mechanism to ignore stale responses if the component unmounts or if a new request is made before the previous one completes.

const { error, data } = useFetch(url, options);
For the full documentation, see usehooks.com/usefetch.

TASKS
useFetch should return an object with error and data properties
useFetch should return the data if the request is successful
useFetch should return the error if the request fails
useFetch should cache the response if the same request is made again
useFetch should reset its state if the url changes