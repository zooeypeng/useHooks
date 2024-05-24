// What is "rendering" in React?

// Rendering is just a fancy way of saying that React calls your function component with the intent of eventually updating the View.

// 在 React 中，“渲染”（Rendering）是指將 React 組件轉換為瀏覽器可以理解並顯示的 HTML 結構的過程。渲染是 React 組件的核心功能之一，負責將組件的狀態（state）和屬性（props）轉化為視覺上可以看到的 UI。

// 具體來說，渲染過程包括以下步驟：

// 初始渲染（Initial Rendering）：當 React 組件首次被加載時，React 會調用組件的 render 方法（或函數式組件的返回值）來生成對應的虛擬 DOM 結構。這個虛擬 DOM 是一個輕量級的 JavaScript 對象，描述了組件應該如何顯示。

// 虛擬 DOM 與實際 DOM 的比較（Reconciliation）：React 會將生成的虛擬 DOM 與實際 DOM 進行比較，找出需要更新的部分。這個過程稱為 “協調”（Reconciliation）。

// 更新實際 DOM（Updating the Real DOM）：根據虛擬 DOM 的變化，React 會只更新那些需要改變的部分，而不是重新渲染整個 DOM，這樣可以提高性能。

// 重新渲染（Re-rendering）：每當組件的狀態（state）或屬性（props）發生變化時，React 會重新調用 render 方法，重新計算虛擬 DOM，並再次進行協調和 DOM 更新。

// 下面是一個簡單的例子來說明渲染過程：


function MyComponent({ name }) {
    return <h1>Hello, {name}!</h1>;
}

// 初始渲染
<MyComponent name="World" />



// 在這個例子中，當 MyComponent 組件被初次渲染時，React 會調用 MyComponent 的函數，生成一個虛擬 DOM 節點，描述 <h1>Hello, World!</h1>，然後將這個虛擬 DOM 轉換為實際 DOM，顯示在瀏覽器中。

// 總結來說，渲染是將 React 組件轉換為實際 DOM 結構並顯示在瀏覽器中的過程，包含初始渲染和在狀態或屬性變化時的重新渲染。這個過程的高效性是 React 性能優勢的重要來源。