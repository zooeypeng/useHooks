// How would you handle the scenario where two components depend on the same piece of state?

// Whenever you have state that multiple components depend on, you'll want to lift that state up to the nearest parent component and then pass it down via props.

// 如果兩個組件依賴於相同的狀態，我們可以將這個狀態提升到它們的最近共同祖先組件中。這樣，這個狀態就可以被兩個組件共享，並且任何一個組件對這個狀態的修改都會反映到另一個組件中。

// 如果這個狀態需要被更多的組件共享，我們也可以考慮使用 React 的 Context API 來管理全局的狀態，這樣所有依賴這個狀態的組件都可以直接從 Context 中訪問到它，而不需要透過 props 進行傳遞。 Context 提供了一種在組件樹中傳遞數據的方法，而不需要在每一層嵌套組件中顯式傳遞 props。

// 總的來說，我們可以通過將狀態提升到它們的共同祖先組件中，或者使用 React 的 Context API，來處理兩個組件依賴於相同狀態的情況。