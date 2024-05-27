// What is React.memo and when would you want to use it?

// React.memo is a higher-order component (a function that takes in a React component as an argument and returns a new component).

// You'd want to use it when you have an expensive component and you want the component to opt of of React's default behavior and only re-render when its props change.

// React.memo 是一個高階組件，用於優化 React 應用程序的性能。當組件的 props 沒有改變時，React.memo 可以記住（記憶）組件的渲染結果，並在下次渲染時重用它們，從而避免不必要的渲染。

// 當你希望避免在父組件重新渲染時，因為其 props 沒有改變而導致子組件重新渲染時，你可以使用 React.memo。這在以下情況下特別有用：

// 1. 當組件是純函數組件時，且其渲染開銷比較大，可能會導致性能問題時。
// 2. 當組件的渲染結果是由其 props 完全決定時，且這些 props 很少更改。
// 3. 當組件處於列表或迭代中，並且組件的 props 在列表中的不同項目之間保持不變時，可以使用 React.memo 來優化性能。

// 總的來說，React.memo 是一個有用的工具，可幫助你優化 React 應用程序的性能，特別是在需要減少不必要的重新渲染時。