// What are some common pitfalls with useEffect and how can you avoid them?

// There are a bunch.

// 1. You should avoid using useEffect for data transformations. Instead, derive state at the top of the component.
// 避免在 useEffect 中進行數據轉換：應該在組件的頂部派生狀態，而不是在 useEffect 中進行數據轉換。
// 不好的做法：在 useEffect 中進行數據轉換

function MyComponent({ items }) {
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const result = items.filter(item => item.active);
    setFilteredItems(result);
  }, [items]);

  return (
    <div>
      {filteredItems.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

// 更好的做法：在渲染邏輯中派生狀態

function MyComponent({ items }) {
  const filteredItems = items.filter(item => item.active);

  return (
    <div>
      {filteredItems.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
// 在第二個例子中，我們直接在渲染邏輯中計算 filteredItems，而不是通過 useEffect 和 useState 進行處理。這樣可以使代碼更加簡潔，並且避免了不必要的副作用管理。



// 2. If a side effect is triggered by a specific user event, put that side effect in an event handler instead of useEffect
// 如果副作用是由特定的用戶事件觸發的，應該將該副作用放在事件處理程序中，而不是 useEffect 中。這樣可以確保副作用僅在事件發生時觸發。
// 不好的做法：在 useEffect 中處理用戶事件

import { useEffect, useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleClick = () => {
      setCount(count + 1);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [count]);

  return <div>Count: {count}</div>;
}
// 在這個例子中，我們在 useEffect 中添加了一個全局點擊事件監聽器來更新 count 狀態。這種做法會導致在每次組件重新渲染時都添加和刪除事件監聽器，效率低下且容易出錯。
// 更好的做法：在事件處理程序中處理用戶事件

import { useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <button onClick={handleClick}>Increase Count</button>
      <div>Count: {count}</div>
    </div>
  );
}

// 在這個例子中，我們將點擊事件的處理邏輯放在了 handleClick 事件處理程序中。這樣，count 狀態只會在按鈕被點擊時更新，而不會在組件重新渲染時不必要地執行。
// 這種做法可以確保副作用（即狀態更新）僅在特定的用戶事件（按鈕點擊）發生時觸發，從而提高代碼的性能和可讀性。



// 3. Don't use useEffect as a way to react to props or state changes.
// 不要使用 useEffect 來響應 props 或 state 的變化。相反，應該使用派生狀態或其他更合適的方法來處理這些變化。
// 當你需要在 props 或 state 改變時執行某些操作時，不應該直接在 `useEffect` 中響應這些變化，而應該使用派生狀態或其他更適合的方法來處理。

// #### 不好的做法：在 `useEffect` 中響應 props 或 state 變化

import { useEffect, useState } from 'react';

function MyComponent({ value }) {
  const [derivedValue, setDerivedValue] = useState('');

  useEffect(() => {
    // 當 value 改變時，更新 derivedValue
    setDerivedValue(value.toUpperCase());
  }, [value]);

  return <div>Derived Value: {derivedValue}</div>;
}

// 在這個例子中，我們使用 `useEffect` 來監聽 `value` 的變化，並根據 `value` 的變化更新 `derivedValue`。這種做法使得代碼更複雜，並且增加了不必要的副作用。

// #### 更好的做法：使用派生狀態

function MyComponent({ value }) {
  // 直接派生狀態，而不是通過 useEffect 更新
  const derivedValue = value.toUpperCase();

  return <div>Derived Value: {derivedValue}</div>;
}


// 在這個例子中，我們直接在渲染邏輯中根據 `value` 計算 `derivedValue`。這樣，代碼更加簡潔，並且避免了不必要的副作用。
// #### 當確實需要在 props 或 state 改變時執行副作用
// 當你確實需要在 props 或 state 改變時執行某些副作用（例如，觸發動畫、更新外部資源等），可以使用 `useEffect`，但需要注意依賴項數組的設置，以確保副作用僅在必要時執行。


import { useEffect } from 'react';

function MyComponent({ value }) {
  useEffect(() => {
    // 假設這是一個需要在 value 改變時觸發的副作用，例如記錄數據
    console.log('Value changed:', value);

    // 這裡可能還有其他副作用邏輯
  }, [value]); // 確保依賴項數組設置正確

  return <div>Value: {value}</div>;
}

// 在這個例子中，我們在 `useEffect` 中根據 `value` 的變化執行某些副作用，同時確保依賴項數組設置正確，以避免不必要的重新執行。這樣可以確保副作用的執行是有意義且必要的。


// 4. Don't use useEffect to subscribe to an external store, instead use useSyncExternalStore.
// 不要使用 useEffect 訂閱外部存儲：相反，應該使用 useSyncExternalStore 來處理外部存儲的訂閱。

// 不好的做法：在 useEffect 中訂閱外部存儲
// 假設我們有一個簡單的外部存儲（例如 Redux store 或自定義的事件總線），我們希望在組件中訂閱這個存儲的變化：

import { useEffect, useState } from 'react';
import { myStore } from './myStore'; // 假設這是一個外部存儲

function MyComponent() {
  const [storeValue, setStoreValue] = useState(myStore.getValue());

  useEffect(() => {
    const handleStoreChange = () => {
      setStoreValue(myStore.getValue());
    };

    // 訂閱外部存儲的變化
    myStore.subscribe(handleStoreChange);

    // 清除訂閱
    return () => {
      myStore.unsubscribe(handleStoreChange);
    };
  }, []);

  return <div>Store Value: {storeValue}</div>;
}

// 在這個例子中，我們使用 useEffect 來訂閱外部存儲的變化，這可能會導致一些問題，例如競態條件和不一致的渲染。
// 更好的做法：使用 useSyncExternalStore
// React 提供了 useSyncExternalStore 來更安全地訂閱和同步外部存儲的狀態：


import { useSyncExternalStore } from 'react';
import { myStore } from './myStore'; // 假設這是一個外部存儲

function MyComponent() {
  const storeValue = useSyncExternalStore(
    myStore.subscribe, 
    myStore.getValue
  );

  return <div>Store Value: {storeValue}</div>;
}

// 在這個例子中，我們使用 useSyncExternalStore 來訂閱外部存儲的變化。useSyncExternalStore 確保了狀態的一致性和安全性，並且更簡潔易讀。

// myStore 的實現示例
// 為了完整性，這裡是一個簡單的 myStore 實現示例：

class Store {
  constructor() {
    this.value = 0;
    this.listeners = new Set();
  }

  getValue = () => this.value;

  subscribe = (listener) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  setValue = (newValue) => {
    this.value = newValue;
    this.listeners.forEach(listener => listener());
  };
}

export const myStore = new Store();
// 這個 myStore 類模擬了一個簡單的外部存儲，包含訂閱和通知機制。在組件中使用 useSyncExternalStore 來訂閱這個存儲，確保了狀態的一致性和安全性。
 

// 5. Don't ignore useEffect's dependency array or leave values out of it.
// 不要忽略 useEffect 的依賴項數組或在其中遺漏值：確保依賴項數組包含所有需要同步的依賴項。
// 這點的關鍵是理解 useEffect 的依賴數組不是用來強制重新運行 effect，而是用來列出 effect 中需要監聽的變量，這些變量變化時，effect 會重新運行。依賴數組應該包含所有 effect 中使用的外部變量，以確保 effect 的邏輯與這些變量保持同步。

// 錯誤示例：錯誤理解依賴數組
// 在這個例子中，我們可能會誤以為只要在依賴數組中加入任何變量就能強制重新運行 effect，這樣做忽略了 effect 與這些變量之間的實際邏輯聯繫。

import { useEffect, useState } from 'react';

function MyComponent({ propA }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 這個副作用實際上與 count 無關
    console.log('Effect ran');
  }, [count]); // 錯誤：這裡的副作用不依賴 count，不應該使用 count 作為依賴

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  );
}
// 在這個例子中，我們在 useEffect 的依賴數組中添加了 count，但實際上這個 effect 與 count 無關。我們只是希望 effect 重新運行，但這不是依賴數組的正確用法。

// 正確示例：使用依賴數組來同步依賴項
// 這個例子展示了如何正確地使用依賴數組，確保 effect 中的邏輯與依賴項保持同步。

import { useEffect, useState } from 'react';

function MyComponent({ userId }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // 當 userId 變化時，同步獲取新的用戶數據
    const fetchData = async () => {
      const response = await fetch(`/api/user/${userId}`);
      const data = await response.json();
      setUserData(data);
    };

    fetchData();
  }, [userId]); // userId 是需要同步的依賴項

  return (
    <div>
      {userData ? (
        <div>{userData.name}</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
// 在這個例子中，我們確保了當 userId 改變時，useEffect 會重新運行以獲取新的用戶數據。這樣，我們使用依賴數組來同步 userId 與 effect 的執行邏輯，確保數據與 userId 保持一致。

// 6. Don't think of useEffect's dependency array as a way to re-run the effect. Instead, it's a list of all of the dependencies needed to synchronize with some outside system.
// 不要將 useEffect 的依賴項數組視為一個重新運行 effect 的方式。相反，應該將其視為一個包含所有需要同步的依賴項的列表，以確保 useEffect 中的邏輯在這些依賴項變化時正確執行。這樣可以確保副作用與外部系統或數據保持一致。


// 在使用 `useEffect` 時，一些常見的陷阱及其避免方法包括：

// 1. **依賴項數組（dependency array）使用不當**：
//    - 陷阱：依賴項數組沒有正確指定，導致 `useEffect` 在每次渲染時都會執行，或者忽略了某些依賴項，導致狀態不同步。
//    - 避免方法：確保依賴項數組包含所有在 `useEffect` 中使用的變量。如果變量是從 props 或 state 中獲取的，都應包含在依賴項數組中。


   useEffect(() => {
     // 一些副作用邏輯
   }, [dependency1, dependency2]); // 正確指定所有依賴項


// 2. **無限循環**：
//    - 陷阱：`useEffect` 中的狀態更新導致組件重新渲染，進而再次觸發 `useEffect`，從而進入無限循環。
//    - 避免方法：小心處理 `useEffect` 中的狀態更新，確保不會在沒有必要的情況下觸發更新。

   useEffect(() => {
     const fetchData = async () => {
       const result = await fetch('/api/data');
       setData(await result.json());
     };

     fetchData();
   }, []); // 確保這裡沒有不必要的依賴項


// 3. **清除副作用不當**：
//    - 陷阱：沒有正確清除副作用，導致內存泄漏或無法正確取消訂閱等問題。
//    - 避免方法：在 `useEffect` 的返回函數中正確清除副作用，比如清除訂閱或計時器。

//    ```jsx
//    useEffect(() => {
//      const intervalId = setInterval(() => {
//        // 一些重複執行的邏輯
//      }, 1000);

//      return () => clearInterval(intervalId); // 清除計時器
//    }, []);
//    ```

// 4. **依賴項變化後未正確處理**：
//    - 陷阱：當依賴項變化時，`useEffect` 中的邏輯沒有正確處理前一個狀態，導致不一致的狀態或邏輯錯誤。
//    - 避免方法：在 `useEffect` 中考慮依賴項變化後需要執行的清理或初始化邏輯。

   useEffect(() => {
     const handle = someEvent.subscribe(() => {
       // 事件處理邏輯
     });

     return () => handle.unsubscribe(); // 依賴項變化時清除之前的訂閱
   }, [someEvent]);

// 總的來說，正確使用 `useEffect` 的關鍵在於：正確設置依賴項數組、避免無限循環、正確清除副作用，以及處理依賴項變化。通過這些方法，可以避免常見的陷阱，使代碼更加健壯和可維護。