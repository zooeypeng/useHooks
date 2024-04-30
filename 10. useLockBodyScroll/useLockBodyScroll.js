import * as React from "react";

export default function useLockBodyScroll() {
  React.useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow; // 把外層 overflow 的 style 先存著

    document.body.style.overflow = "hidden"; // 把外層的 overflow 停住

    return () => {
      document.body.style.overflow = originalStyle; // 離開的時候再把原本的 style 還原
    };
  }, []);
}
