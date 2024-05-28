// Tell me everything you know about React's useMemo hook

// useMemo lets you cache the result of a calculation between renders.
// useMemo 讓你可以在渲染之間緩存計算結果。

const cachedValue = React.useMemo(
    calculateValue, 
    dependencies
)

// Its first argument is a function that returns the value you want to cache. Its second argument is an array of dependencies the function depends on. If any of the dependencies change, the cached value will be recalculated.
// 它的第一個參數是一個返回你想要緩存的值的函數。第二個參數是一個依賴項數組，函數依賴於這些依賴項。如果任何依賴項發生變化，緩存的值將會重新計算。



// Here's what one realistic example might look like.


const filteredAndSortedItems = React.useMemo(() => {
    return items
      .filter(item => item.name.includes(searchTerm))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [items, searchTerm]);


//   Now, unless items or searchTerm change, the filteredAndSortedItems value will be referentially identical across renders.
// 現在，除非 items 或 searchTerm 發生變化，filteredAndSortedItems 的值在各次渲染之間將保持引用上的相同。

