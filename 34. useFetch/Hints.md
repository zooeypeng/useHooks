Hint #1 – fetchData
useFetch has some fancy features like caching and ignoring stale responses, but ignore those for now. For now, just worry about fetching the data from the url and then dispatching the appropriate action (loading, fetched, or error) based on the response.

Here's a preview.

const fetchData = async () => {
 dispatch({ type: "loading" });

 try {
   const res = await onFetch(url);

   if (!res.ok) {
     throw new Error(res.statusText);
   }

   const json = await res.json();

   dispatch({ type: "fetched", payload: json });
 } catch (e) {
   dispatch({ type: "error", payload: e });
 }
};
One aspect of this code that may not be as straight forward is onFetch. The reason we need onFetch is because options is a reference value, but we need to include it inside of useEffect. By now, that should be enough to clue you into where onFetch comes from. If you need a little more help, check out the code below.

export default function useFetch(url, options) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onFetch = React.useEffectEvent((url) => {
    return fetch(url, options);
  });

  React.useEffect(() => {
    if (typeof url !== "string") return;

    const fetchData = async () => {
      dispatch({ type: "loading" });

      try {
        const res = await onFetch(url);

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const json = await res.json();

        dispatch({ type: "fetched", payload: json });
      } catch (e) {
        dispatch({ type: "error", payload: e });
      }
    };

    fetchData();
  }, [url]);

  return state;
}
Hint #2 – ignore
One feature of useFetch is that it'll ignore stale responses if the component using useFetch is removed from the DOM or if a new request is made before the original request resolves.

To do this, you can take advantage of how closures work in JavaScript by creating an ignore variable in the effect and initializing it to false. Then, when the cleanup function for the effect runs (which it will if another request is made), you can set ignore to true. That way, before you ever dispatch, you can check if ignore is false, meaning no other requests have been made.

React.useEffect(() => {
  if (typeof url !== "string") return;

  let ignore = false;

  const fetchData = async () => {
    dispatch({ type: "loading" });

    try {
      const res = await onFetch(url);

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const json = await res.json();

      if (ignore === false) {
        dispatch({ type: "fetched", payload: json });
      }
    } catch (e) {
      if (ignore === false) {
        dispatch({ type: "error", payload: e });
      }
    }
  };

  fetchData();

  return () => {
    ignore = true
  };
}, [url]);
Hint #3 – cache
Another benefit of useFetch is that it'll cache the result of a request so if the same request is made again, it'll return the cached response instead of making a new request. To do this, you'll want to use a ref as the cache so that way the cache will persist across renders.

export default function useFetch(url, options) {
  const cacheRef = React.useRef({});

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onFetch = React.useEffectEvent((url) => {
    return fetch(url, options);
  });

  React.useEffect(() => {
    if (typeof url !== "string") return;

    let ignore = false;

    const fetchData = async () => {
      const cachedResponse = cacheRef.current[url];

      if (cachedResponse) {
        dispatch({ type: "fetched", payload: cachedResponse });
        return;
      }

      dispatch({ type: "loading" });

      try {
        const res = await onFetch(url);

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const json = await res.json();
        cacheRef.current[url] = json;

        if (ignore === false) {
          dispatch({ type: "fetched", payload: json });
        }
      } catch (e) {
        if (ignore === false) {
          dispatch({ type: "error", payload: e });
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [url]);

  return state;
}