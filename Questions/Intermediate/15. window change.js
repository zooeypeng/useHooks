// How would you approach building a React app that needed to read the browser's window size and react to its changes?

// I'd encapsulate all of the logic for computing the browser's window size into its own custom useWindowSize hook (and I'd be sure to use useLayoutEffect instead of useEffect since the hook is reliant upon layout information).

import * as React from "react";
export default function useWindowSize() {
  const [size, setSize] = React.useState({
    width: null,
    height: null
  });
  React.useLayoutEffect(() => {
    const handler = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    handler();
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);
  return size;
}

// 將計算瀏覽器窗口大小的邏輯封裝在自定義的 useWindowSize 鉤子中，這樣可以使代碼更加模組化和可重用。同時，提到使用 useLayoutEffect 而不是 useEffect，這是因為該鉤子依賴於佈局信息，確保了在渲染之前同步觸發操作