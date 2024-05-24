// What are the two most common scenarios for using useRef in React?

// To preserve a value across renders, without triggering a re-render when it changes.
// To get a reference to a DOM node.

// 在 React 中，`useRef` 最常見的兩個使用場景是：

// 1. **保存 DOM 元素的引用**：使用 `useRef` 可以在函數組件中保存對 DOM 元素的引用。這對於需要在 JavaScript 中直接訪問 DOM 元素的情況非常有用，比如手動觸發焦點、添加事件監聽器等。

// 保存 DOM 元素的引用：

import { useRef } from 'react';

function MyComponent() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus(); // 將焦點設置到 input 元素上
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}

// 在這個例子中，我們使用 useRef 創建了一個 inputRef，並將其作為 ref 屬性綁定到 input 元素上。當點擊按鈕時，handleClick 函數將焦點設置到 input 元素上。

// 2. **保存組件內部的可變值**：`useRef` 也可以用來保存組件內部的可變值，這些值不會觸發組件的重新渲染。這在需要在組件的多次渲染之間保持某些值的狀態時非常有用，比如計數器、定時器等。

// 保存組件內部的可變值：

import { useRef, useEffect } from 'react';

function MyComponent() {
  const timerRef = useRef(null);
  const countRef = useRef(0);

  useEffect(() => {
    // 每秒增加計數器的值
    timerRef.current = setInterval(() => {
      countRef.current += 1;
      console.log(`Count: ${countRef.current}`);
    }, 1000);

    // 在組件卸載時清除定時器
    return () => clearInterval(timerRef.current);
  }, []);

  return <div>Counting...</div>;
}

// 在這個例子中，我們使用 useRef 創建了一個 timerRef 和 countRef。timerRef 用於保存定時器的引用，而 countRef 用於保存計數器的值。我們在 useEffect 鉤子中使用 timerRef 創建了一個定時器，每秒增加 countRef 的值，並在組件卸載時清除定時器。這樣，計數器的值就可以在組件的多次渲染之間保持不變。

// 總的來說，`useRef` 可以用來保存 DOM 元素的引用或者保存組件內部的可變值，並且在不引起組件重新渲染的情況下使用這些值。
