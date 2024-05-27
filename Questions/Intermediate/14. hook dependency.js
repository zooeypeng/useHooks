// Why is it necessary to include every dependency in useEffect's dependency array?

// There are two primary reasons.

// If you don't, React (and more specifically ESLint) will yell at you.
// Because of how React's snapshot phase "captures" the component's props and state at specific moments in time, there are scenarios where, if you don't include the appropriate values in the dependency array, those missing values will be "stale" inside of useEffect.

// 第一個原因是避免 React 或 ESLint 發出警告。這指出了在代碼中省略依賴項可能會導致 React 或 ESLint 提示錯誤，從而使開發人員能夠確保代碼的一致性和品質。

// 第二個原因涉及到 React 的快照階段如何“捕獲”組件的 props 和 state。它指出了如果在 useEffect 的依賴數組中未包含相應的值，則這些值可能會在 useEffect 內部變得“過時”，這可能會導致錯誤的行為。這提醒了開發人員在使用 useEffect 時確保包含所有相關的依賴項，以確保代碼的正確性和一致性。