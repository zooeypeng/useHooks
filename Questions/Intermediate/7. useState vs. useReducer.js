// What are some signals that tell you you should reach for useReducer instead of useState?

// useReducer offers a bit more flexibility than useState since it allows you to decouple how the state is updated from the action that triggered the update - typically leading to more declarative state updates.

// If your state tends to be updated together or if updating one piece of state is based on another piece of state, that's a signal you might want to use useReducer.

// 更靈活的狀態更新方式：useReducer 允許您將狀態的更新邏輯從觸發更新的操作中解耦。這通常導致更具聲明性的狀態更新，使得代碼更易於理解和維護。

// 狀態更新彼此相關：當您的狀態更新通常是一起進行的，或者一個狀態的更新基於另一個狀態的值時，這是您可能希望使用 useReducer 的一個信號。useReducer 可以幫助您更好地組織和管理這些相關的狀態更新。

// 總的來說，當您需要更靈活、更聲明性的狀態更新方式，或者您的狀態更新之間彼此相關時，useReducer 可能是一個更好的選擇。這將幫助您更好地組織和管理組件的狀態，使代碼更易於理解和維護。


// 一些暗示你應該使用 `useReducer` 而不是 `useState` 的信號包括：

// 1. **複雜的狀態邏輯**：當組件的狀態邏輯變得複雜時，`useReducer` 可以幫助組織和管理狀態的更新邏輯。它允許您將相關的狀態和相關的更新邏輯放在一起，使代碼更易於理解和維護。

// 2. **多個相關狀態**：如果您的組件具有多個相關的狀態，且這些狀態之間存在復雜的相互作用，`useReducer` 可能比多個 `useState` 更適合。它可以幫助您更好地管理這些相關狀態之間的依賴關係和更新順序。

// 3. **組件具有複雜的行為**：當組件的行為變得很複雜，且狀態更新不再是單純的事情時，`useReducer` 可以提供更強大的功能。它允許您使用更複雜的邏輯來處理狀態更新，包括條件更新、異步更新等。

// 總的來說，當您感覺到您的組件的狀態管理變得複雜或者需要更多的控制時，考慮使用 `useReducer` 可能是一個好的選擇。這將幫助您更好地組織和管理組件的狀態，使代碼更易於理解和維護。