// How would you fetch data from an external API in a React application?

// Fetching data from an external API is a side effect, so you'll need to get it out of React's rendering flow. You have two options for this. If the side effect is triggered by a specific user event, you can stick it inside of an event handler. If it's not, then you're most likely synchronizing your component with some outside system and therefore, you'll want to stick it inside of useEffect.

const handleItemClick = (id) => {
    setItemLoading(id)
    try {
      const url = `/api/items/${id}`
      const response = await fetch(url);
      const data = await response.json();
      setItemDetails(data);
      setItemLoading(false)
    } catch (error) {
      setItemDetails(null)
      setItemError(error)
      setItemLoading(false)
    }
  }

  React.useEffect(() => {
    let ignore = false
    const fetchUser = async () => {
      const url = `https://example.com/api/${uid}`;
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (ignore === false) {
          setData(data);
          setError(null)
          setIsLoading(false);
        }
      } catch (error) {
        if (ignore === false) {
          setData(null);
          setError(error);
          setIsLoading(false);
        }
      }
    }
    fetchUser();
    return () => {
      ignore = true
    }
  }, [uid]);

//   從外部 API 獲取數據是一個副作用，需要將其從 React 的渲染流程中分離出來。它提供了兩種方法來處理這個副作用，具體取決於何時觸發這個副作用。如果副作用是由特定的用戶事件觸發的，可以將其放在事件處理程序中。如果不是，則通常會將其放在 useEffect 中，這樣可以確保在組件的渲染流程之外執行這些非同步操作。