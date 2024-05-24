// What's the de facto way to remove an item from an array that's on state?

// To remove an item from an array, use JavaScript's filter method to create a new array, filtering out the item that should be removed.

const handleRemoveCheater = (id) => {
  const newHighScores = highScores.filter((session) =>
    session.id !== id
  )
  setHighScores(newHighScores)
}


// 在 React 中，從狀態中的數組中刪除項目的標準方法是使用狀態更新函數以不可變的方式更新數組。通常，我們使用 `filter()` 方法來過濾掉需要刪除的項目，然後將過濾後的新數組設置為狀態的值。

// 以下是一個示例，展示了如何從狀態中的數組中刪除項目：


import React, { useState } from 'react';

function MyComponent() {
    const [items, setItems] = useState(['item1', 'item2', 'item3']);

    const removeItem = (indexToRemove) => {
        // 使用 filter() 方法創建一個新的數組，過濾掉需要刪除的項目
        const updatedItems = items.filter((item, index) => index !== indexToRemove);

        // 使用狀態更新函數將新數組設置為狀態的值
        setItems(updatedItems);
    };

    return (
        <div>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={() => removeItem(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyComponent;


// 在這個例子中，我們定義了一個 `removeItem` 函數，它接受要刪除的項目的索引作為參數。我們使用 `filter()` 方法創建了一個新的數組 `updatedItems`，該數組過濾掉了指定索引的項目。然後，我們使用 `setItems` 函數將新的數組設置為狀態的值，觸發組件的重新渲染。这就是从状态中删除数组项的标准方法。