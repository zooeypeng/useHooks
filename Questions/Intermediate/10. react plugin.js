// How would you add support for i18n (localized text) to your React application?

// Because i18n requires that you're able to pass locale data to any component in the component tree, regardless of how deeply nested the components are, context is a good solution for it.

// 使用上下文（context）作為 i18n 的解決方案。上下文提供了一種在 React 應用程序中將數據傳遞到組件樹中任何深度的組件的方法，這對於 i18n 是很有用的，因為它需要將區域設置傳遞給應用程序中的所有組件。这種方式可以确保整個應用程序都能夠訪問和使用區域設置，而不需要在每個組件中進行額外的傳遞。

// 總的來說，使用上下文作為 i18n 的解決方案是一個明智的選擇，可以簡化代碼並確保整個應用程序都能夠獲取所需的本地化數據。