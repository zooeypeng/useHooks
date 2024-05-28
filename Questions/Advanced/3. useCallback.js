// Tell me everything you know about React's useCallback hook

// React 的 useCallback 鉤子是一個用於優化性能的工具，它可以緩存函數，使其在依賴項未變化時保持引用的穩定性

// useCallback lets you cache a function (and therefore, keep it referentially stable across renders).

const cachedFn = React.useCallback(
  fnToCache, 
  dependencies
)

// Its first argument is the function you want to cache and its second argument is an array of dependencies the function depends on. If any of the dependencies change, the cached function will be updated. It's particularly helpful when you're creating a custom hook that returns a function. You'll want to make sure the function's reference stays stable so you don't invalidate any React.memos that the consumer of the hook has.

// 它的第一個參數是你想要緩存的函數，第二個參數是一個依賴數組，該函數依賴這些依賴項。如果任何依賴項發生變化，緩存的函數將會更新。這在你創建返回一個函數的自定義 hook 時特別有用。你會希望確保該函數的引用保持穩定，以免使 hook 的消費者所使用的 React.memo 失效。

const handleClearInterval = React.useCallback(() => {
  window.clearInterval(id.current);
}, []);


// 何時使用 useCallback
// 避免不必要的重新渲染：
// 當子組件依賴於父組件傳遞的回調函數時，如果回調函數在每次渲染時都被重新創建，子組件將不必要地重新渲染。使用 useCallback 可以確保只有在依賴項發生變化時才會創建新的函數，從而避免子組件的重新渲染。

// 優化性能：
// 在高頻率操作或大型數據處理中，使用 useCallback 可以減少不必要的計算和資源浪費，提高應用程序的性能。
import React, { useState, useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <ChildComponent onIncrement={increment} />
      <p>Count: {count}</p>
    </div>
  );
}

function ChildComponent({ onIncrement }) {
  console.log('ChildComponent rendered');
  return <button onClick={onIncrement}>Increment</button>;
}

// 在這個例子中，increment 函數使用 useCallback 進行記憶，只有在 count 發生變化時才會重新創建。這樣可以避免 ChildComponent 不必要的重新渲染。

// 注意事項
// 僅在必要時使用：
// useCallback 主要用於優化性能。如果沒有明顯的性能問題，不應過度使用，因為它會增加代碼的複雜性。

// 依賴數組的正確性：
// 確保依賴數組中的所有依賴項都是正確的。如果漏掉依賴項，可能會導致函數中的值不一致或錯誤。

// 總結來說，useCallback 是一個強大的工具，用於在特定情況下優化 React 組件的性能，通過記住函數的引用來避免不必要的重新渲染和計算。