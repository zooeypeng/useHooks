// Deriving state refers to the practice of computing values based on props or other state within a React component. It allows you to minimize the amount of React state you use in a component, often leading to more predictable state updates.

const [searchTerm, setSearchTerm] = React.useState("");
const filteredItems = items.filter((item) =>
  item.toLowerCase().includes(searchTerm.toLowerCase())
);

/*

filteredItems 是派生狀態，它是基於 items 和 searchTerm 計算出來的，而不是直接存儲在 state 中。每次 searchTerm 改變時，filteredItems 會重新計算。

這樣做有以下幾個好處：

減少冗餘數據：只存儲最小必要的 state（即 searchTerm），其他可以派生出來的數據（即 filteredItems）不存儲在 state 中。這減少了數據重複的可能性。

提高狀態更新的可預測性：當 searchTerm 改變時，我們知道 filteredItems 也會相應地改變，這樣狀態更新變得更加可預測和直觀。

簡化數據流：派生狀態使得數據流更加清晰和簡單，我們不需要在多個地方同步更新 filteredItems，只需要在 searchTerm 改變時重新計算一次即可。

性能優化：避免不必要的狀態存儲和更新，可以提高應用的性能，特別是在需要頻繁更新和重新渲染的情況下。

總結來說，派生狀態是通過計算而不是存儲的方式來處理一些值，這有助於簡化狀態管理，提高應用的性能和可維護性。

*/