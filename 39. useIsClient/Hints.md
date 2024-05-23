Hint #1
It may be surprising to you that this hook doesn't depending on checking if the window object exists. Instead, with React, you can be sure that you're on the client if the useEffect hook has ran (since it only ever runs on the client, not the server).

Hint #2
Since useIsClient returns a boolean, you'll want to add some state to the hook which keeps track of if useEffect has run or not.

import * as React from "react";

export default function useIsClient() {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
At this point in the course we haven't covered why a hook like this is valuable, but once we dive into different rendering strategies (SSR, SSG, etc.) it'll become more clear. The short answer is that there are certain hooks that can only run on the client (think useMediaQuery) and trying to render them anywhere else will cause an error. This hook is a way to prevent that from happening.