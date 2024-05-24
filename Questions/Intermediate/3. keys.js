// What are keys in React and why are they important?

// Keys in React are used to identify unique elements in collections, such as arrays or maps. They play a critical role in helping React keep track of changes in the list or collection, ensuring that the rendering process is efficient and that the state is maintained correctly across re-renders.

friends.map((friend) => {
  return (
    <li key={friend.id}>
      <User profile={friend} />
    </li>
  )
})

// 在 React 中，keys 是用於識別列表中每個元素的特殊屬性。這些 keys 可以幫助 React 識別每個元素，從而在列表發生變化時，React 能夠更有效地更新 UI。

// 舉例來說，當你在 React 中渲染一個動態列表時，每個列表項目都應該有一個唯一的 key。這樣當你添加、刪除或重新排序列表項目時，React 可以通過比較新的 key 和舊的 key 來確定哪些項目需要進行添加、刪除或更新，從而實現更有效的 UI 更新。

// 簡而言之，keys 在 React 中起著非常重要的作用，它們可以幫助 React 保持 UI 的一致性和效率，尤其是在動態列表和動態渲染的情況下。