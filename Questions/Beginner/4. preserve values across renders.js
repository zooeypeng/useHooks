// If you needed to preserve a value across renders, but that value had nothing to do with the UI, what would you do?

// You'd store the value inside of a "ref" using React.useRef.


// 如果需要在多次渲染中保存一個與 UI 無關的值，可以使用 React 的 useRef 鉤子。useRef 可以用來創建一個可變的引用對象，這個對象在組件的整個生命週期內保持不變，並且不會因為組件的重新渲染而改變。

// 以下是如何使用 useRef 來保存一個值的示例：


import React, { useRef, useState } from 'react';

function MyComponent() {
    const [count, setCount] = useState(0);
    const myRef = useRef(0); // 初始化 ref 值

    const handleClick = () => {
        myRef.current = myRef.current + 1; // 更新 ref 值
        console.log("Ref value:", myRef.current); // 輸出當前的 ref 值
        setCount(count + 1); // 更新 state，觸發重新渲染
    };

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={handleClick}>Increase</button>
        </div>
    );
}

// 在這個例子中：

// useRef(0) 創建了一個 myRef 變量，並初始化為 0。
// 每次點擊按鈕時，myRef.current 的值會增加 1，但這個變量的更新不會引起組件重新渲染。
// 組件重新渲染時，myRef.current 保持它之前的值，不會重置。
// 使用 useRef 的好處是，它不會因為重新渲染而丟失數據，非常適合保存那些不會影響 UI 的數據，例如計時器 ID、網絡請求取消標記等。

// 總結來說，如果需要在多次渲染中保存一個與 UI 無關的值，可以使用 useRef 鉤子，因為它提供了一個持久的可變引用，不會因為組件重新渲染而重置。





