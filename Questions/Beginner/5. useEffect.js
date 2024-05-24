// What is the purpose of useEffect?

// From a philosophical perspective, to synchronize your component with some external system. From a pragmatic perspective, to remove side effects (that aren't triggered by a particular event) from React's rendering flow.

// useEffect 主要有兩個作用：

// 與外部系統同步：例如，當你的組件需要從服務器獲取數據，或者訂閱某些事件時，你可以使用 useEffect 來確保這些操作在組件渲染後執行，以保持組件與外部系統的同步。

// 處理副作用：副作用指的是組件內部的操作，它們不直接與組件的渲染結果相關。使用 useEffect 可以將這些副作用隔離出來，防止它們影響到 React 的渲染流程，這有助於保持應用的可預測性和穩定性。

// 當我們說 "to remove side effects from React's rendering flow" 時，我們指的是在 React 的渲染過程中，我們希望移除那些不直接與渲染結果相關的副作用。

// "Side effects" 指的是在組件內部執行的操作，這些操作不僅僅是返回要渲染的 UI 元素，而是還執行了其他額外的任務，比如數據獲取、訂閱事件、手動操作 DOM 等。

// 當這些副作用不受特定事件觸發時，它們可能會影響 React 的渲染流程，導致不必要的重新渲染或性能問題。因此，使用 useEffect 可以將這些副作用隔離出來，讓它們在組件渲染後執行，從而保持 React 渲染的流暢性和可預測性。


// useEffect 是 React 中的一個 Hook，它用於處理副作用。副作用是指組件內部的操作，它們不直接與組件的渲染結果相關，但會影響到組件的行為。舉例來說，數據獲取、訂閱事件、手動操作 DOM 等都屬於副作用。

// useEffect 的主要目的是在組件的生命週期中執行這些副作用操作，以保持組件的行為和狀態與外部環境的同步。它讓你可以在組件渲染後執行一些額外的邏輯，或在組件卸載時清理資源。

// 使用 useEffect 的基本模式如下：



import React, { useEffect } from 'react';

function MyComponent() {
    useEffect(() => {
        // 在組件渲染後執行的邏輯，例如數據獲取、訂閱事件等

        return () => {
            // 在組件卸載時執行的清理邏輯，例如取消訂閱、清除計時器等
        };
    }, []); // 依賴數組，控制何時執行 effect，空數組表示只在組件渲染和卸載時執行
}


// 在這個例子中，useEffect 接受兩個參數：一個是包含副作用操作的函數，另一個是一個依賴數組。當依賴數組中的值發生變化時，React 將重新執行這個 effect。如果依賴數組是空的，則表示這個 effect 只在組件的初始渲染時執行一次，並在組件卸載時執行清理操作。

// 總的來說，useEffect 的目的是使得在函數式組件中處理副作用變得更加簡單和直觀，同時保持組件的行為和狀態與外部環境的同步