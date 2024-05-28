// What is lazy state initialization and when is it useful?

// It's rare, but there are times when your initial state is the result of a calculation (usually encapsulated in a function).
// 在某些情況下，初始狀態需要通過計算來獲得（通常封裝在一個函數中）。

const [state, setState] = React.useState(getInitialState());

// With the code above, even though React will only use the result of getInitialState on the initial render, it's still being invoked on every re-render - wasting resources. To fix this, if you pass a function to useState (as opposed to a function invocation), React will only invoke that function on the initial render in order to get the initial state.
// 如上所示，即使 React 只會在初次渲染時使用 getInitialState 的結果，但這個函數在每次重新渲染時都會被調用，浪費資源。為了解決這個問題，如果你將函數本身傳遞給 useState（而不是函數調用），React 只會在初次渲染時調用該函數來獲取初始狀態。

const [state, setState] = React.useState(getInitialState)

// All subsequent re-renders, React will now ignore getInitialState.
// 在後續的重新渲染中，React 將忽略 getInitialState。

// 總結：
// 這樣做的目的是確保初始化計算僅在初次渲染時進行，從而避免不必要的資源浪費。



// 假設我們有一個計數器組件，初始計數值需要通過一個耗時的計算來獲得，比如計算一個數字範圍內的所有整數之和。
import React from 'react';

function computeInitialCount() {
  let initialCount = 0;
  for (let i = 1; i <= 1000; i++) {
    initialCount += i;
  }
  return initialCount;
}

function Counter() {
  const [count, setCount] = React.useState(computeInitialCount); // 注意這裡傳遞的是函數本身

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>Increment</button>
    </div>
  );
}

export default Counter;

// 在這個例子中，computeInitialCount 函數用於計算初始計數值，它在組件的初次渲染時被調用一次。由於傳遞的是函數本身而不是函數的調用結果，所以 React 只會在初次渲染時調用 computeInitialCount 來獲取初始計數值。在後續的重新渲染中，React 將忽略 computeInitialCount，從而避免了不必要的計算。



