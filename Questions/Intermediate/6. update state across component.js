// How would you handle updating state that two components depend on?

// Often times when lifting state up, you decouple where the state lives from the event handlers that update that state. To solve this, you'll create an updater function in the parent component where the state lives and, via props, invoke that function from the child component(s) where the event handler(s) live.

// 這個答案描述了一個常見的模式，即將狀態提升到其共同祖先組件中，並將更新狀態的邏輯封裝在父組件中的更新函數中。通過將這個更新函數通過 props 傳遞給子組件，在子組件中觸發事件時，可以調用這個更新函數來更新狀態。

// 這種模式的好處是將狀態的管理和更新邏輯與 UI 的渲染邏輯進行了解耦，使得代碼更加模組化和可維護。同時，它還提高了組件的可重用性，因為更新邏輯被封裝在了父組件中，子組件可以在不同的上下文中重複使用而不需要修改其內部實現。

// 如果兩個組件都依賴於相同的狀態，並且需要在狀態更新時同步更新，我們可以採取以下方法：

// 1. **提升共享狀態**：將這個共享狀態提升到兩個組件的最近共同祖先組件中。這樣，當狀態更新時，兩個組件都能接收到最新的狀態並進行更新。

// 2. **使用回調函數**：如果狀態的更新是異步的，我們可以通過在更新狀態時傳遞回調函數的方式來確保兩個組件都能在狀態更新後得到通知並進行相應的操作。

// 3. **使用 React 的 Context API**：如果這個共享狀態需要被更多的組件共享，我們可以考慮使用 React 的 Context API 來管理全局的狀態。這樣所有依賴這個狀態的組件都可以直接從 Context 中訪問到它，並在狀態更新時同步進行相應的操作。

// 這些方法都可以確保兩個組件依賴的狀態在更新時能夠同步更新，從而保持應用程序的一致性和可預測性。