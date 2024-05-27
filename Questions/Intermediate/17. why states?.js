// Why are regular variables insufficient for reacting to user interactions in a React component?
// 為什麼在 React 組件中使用普通的變量（非 React 的狀態）來響應用戶的操作是不夠的。


// For a few different reasons.

// React has no way of knowing when regular variables change and is therefore unable to trigger a re-render when they do.
// Normal variables don't get persisted across renders.

// React 無法知道正常的變量何時發生變化，因此無法在它們發生變化時重新渲染組件。就像一個故事中的角色，React 只能看到特殊的"魔法"狀態，這些狀態是 React 自己能夠掌握和跟蹤的。而一般的變量對於 React 來說就像是一個看不見的角色，因此它們的改變不會被 React 感知到。

// 另外，正常的變量在組件重新渲染時不會被保留，就像是一個人在每次看到一個場景時都忘記了前一次的事情。這意味著即使你在上一次渲染中設置了一個變量的值，但當組件重新渲染時，這個值也會被重置，並且不會被保留下來。


// 普通的变量对于在 React 组件中响应用户交互是不够的，原因如下：

// React 无法感知普通变量的变化：React 无法自动追踪普通变量的变化，因此无法在其发生变化时触发组件的重新渲染。

// 普通变量不会跨渲染保留：普通变量在组件重新渲染时不会被保留，这意味着它们的值会在每次重新渲染时重置，而不会持续保留上一次渲染的值。

// 總的來說，普通的 JavaScript 变量缺乏 React 状态的特性，不能触发组件的重新渲染，也无法在渲染之间保留其值，因此无法有效地用于响应用户交互。