// What's the purpose of React's useEffectEvent hook?


// useEffectEvent allows you to abstract any reactive but non-synchronizing values into their own event handler that you can then use inside of useEffect without needing to declare in useEffect's dependency array.

// 這個 useEffectEvent 鉤子允許你將任何反應式但不需要同步的值抽象成自己的事件處理器，然後可以在 useEffect 內使用，而不需要在 useEffect 的依賴陣列中聲明。

const onPageView = React.useEffectEvent((url) => {
  pageview(url, state)
})
React.useEffect(() => {
  onPageView(url)
}, [url])