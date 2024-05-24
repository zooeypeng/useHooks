// What's the de facto way to add a new item to an array that's on state?

// To add an item to an array, use JavaScript's spread operator (...) to spread all the existing elements onto a new array with the new item.

const handleNewHighScore = (session) => {
  const newHighScores = [...highScores, session]
  setHighScores(newHighScores)
}

// 在 React 中，向狀態中的數組添加新項目的標準方法是使用狀態更新函數以不可變的方式更新數組。具體來說，你可以使用狀態更新函數，如 `setState` 或者使用 `useState` Hook 中返回的更新函數，來創建一個新的數組，並將新項目添加到這個新數組中，然後將其設置為狀態的值。

// 以下是一個示例，展示了如何向狀態中的數組添加新項目：


import React, { useState } from 'react';

function MyComponent() {
    const [items, setItems] = useState(['item1', 'item2', 'item3']);

    const addItem = () => {
        // 使用 spread 運算符創建一個新的數組，並將新項目添加到該數組中
        const newItems = [...items, 'newItem'];

        // 使用狀態更新函數將新數組設置為狀態的值
        setItems(newItems);
    };

    return (
        <div>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <button onClick={addItem}>Add Item</button>
        </div>
    );
}

export default MyComponent;


// 在這個例子中，我們使用 `useState` Hook 創建了一個狀態變量 `items`，它是一個包含幾個項目的數組。然後，我們定義了一個 `addItem` 函數，用於在點擊按鈕時向 `items` 數組中添加一個新的項目。我們使用了展開運算符 (`...`) 來創建一個新的數組，並將新項目添加到這個新數組中。最後，我們使用 `setItems` 函數將新的數組設置為 `items` 狀態的值，觸發組件的重新渲染。