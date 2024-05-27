// What is the purpose of React's StrictMode component?

// StrictMode is a React component that enables the following behavior in development:

// Your components will re-render an extra time to find bugs caused by impure rendering.
// Your components will re-run Effects an extra time to find bugs caused by improper cleanups.
// Your components will be checked for deprecated APIs.

// 組件將多次重新渲染，以發現由不純的渲染引起的錯誤。
// 效果（Effects）將多次運行，以發現由於不正確的清理而引起的錯誤。
// 將檢查組件是否使用了已棄用的 API。

// React 的 StrictMode 组件的目的是幫助開發者在開發過程中檢測並解決潛在的問題，同時提供更好的開發者警告和調試工具。它可以在開發模式下檢查應用程序中的一些常見問題，例如不安全的生命周期使用、過時的 API 使用、副作用操作等，從而提高代碼質量和性能。總的來說，StrictMode 有助於提高 React 應用程序的健壯性和可靠性。