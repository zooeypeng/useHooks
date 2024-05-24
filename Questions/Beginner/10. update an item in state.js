// What's the de facto way to update an item in an array that's on state?

// To update an item, use JavaScript's map method to create a new array, updating the specific item where appropriate.

const handleUpdateHighScore = (updatedSession) => {
  const newHighScores = highScores.map((session) => {
    return session.id === updatedSession.id
      ? updatedSession
      : session
  })
  setHighScores(newHighScores)
}


// 在 React 中，更新狀態中的數組中的項目通常使用與刪除項目類似的方法來實現。我們首先創建一個新的數組，將需要更新的項目替換為新的值，然後將這個新的數組設置為狀態的值。

// 以下是一個示例，展示了如何更新狀態中的數組中的項目：


import React, { useState } from 'react';

function MyComponent() {
    const [items, setItems] = useState([
        { id: 1, name: 'item1' },
        { id: 2, name: 'item2' },
        { id: 3, name: 'item3' }
    ]);

    const updateItem = (idToUpdate, newName) => {
        // 使用 map() 方法創建一個新的數組，更新指定 id 的項目
        const updatedItems = items.map(item => {
            if (item.id === idToUpdate) {
                return { ...item, name: newName };
            }
            return item;
        });

        // 使用狀態更新函數將新數組設置為狀態的值
        setItems(updatedItems);
    };

    return (
        <div>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name}
                        <button onClick={() => updateItem(item.id, 'newName')}>
                            Update
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyComponent;


// 在這個例子中，我們定義了一個 `updateItem` 函數，它接受要更新的項目的 id 和新的名稱作為參數。我們使用 `map()` 方法創建了一個新的數組 `updatedItems`，將指定 id 的項目替換為具有新名稱的新對象。然後，我們使用 `setItems` 函數將新的數組設置為狀態的值，觸發組件的重新渲染。