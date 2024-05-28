// Describe the process that happens when React renders

// When React renders a component, two things happen.

// First, React creates a snapshot of your component which captures everything React needs to update the view at that particular moment in time. props, state, event handlers, and a description of the UI (based on those props and state) are all captured in this snapshot.

// From there, React takes that description of the UI and uses it to update the View.

// 當 React 渲染一個組件時，會發生兩件事。

// 首先，React 會創建組件的 snapshot，捕捉更新 view 所需的所有信息。在這個快照中，props、state、事件處理程序以及基於這些 props 和 state 的 UI 描述都會被捕捉。

// 接下來，React 會根據這個 UI 描述來更新 view。