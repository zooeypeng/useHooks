// What would you do if you had two components that both needed to share the same non-visual logic?

// You'd encapsulate that logic into a custom hook that each component could consume.

export default function useNonVisualLogic() {
  // Reusable, non visual logic 
}

// 如果有兩個組件都需要共享相同的非視覺邏輯，我會將這個邏輯提取到一個獨立的函數或 Hook 中，然後在這兩個組件中使用它。這樣可以避免代碼重複，並確保邏輯的一致性和可維護性。