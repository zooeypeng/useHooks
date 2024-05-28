// What is "batching" in React?

// Batching is React's algorithm for minimizing unnecessary re-renders. It works by taking into account every updater function inside of an event handler before it updates its state and triggers a re-render.

// 它是一種優化算法，用於最小化不必要的重新渲染。當有多個狀態更新或者多個 React 更新操作發生時，React 會將它們收集在一起，在更新狀態和觸發重新渲染之前，綜合考慮所有的更新函數。這樣可以有效地減少渲染次數，提高應用的性能和效能。