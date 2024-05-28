// What are the 5 rules for managing side effects in React?



// Rule #0 – When a component renders, it should do so without running into any side effects
// 規則 #0：組件渲染時應該避免遇到任何副作用。

function SimpleComponent({ text }) {
    return <div>{text}</div>;
  }


// Rule #1 – If a side effect is triggered by an event, put that side effect in an event handler
// 規則 #1：如果副作用是由事件觸發的，將該副作用放在事件處理程序中。例如，當按鈕被點擊時觸發一個副作用：

function ButtonWithSideEffect() {
    const handleClick = () => {
      // 副作用在事件處理程序中觸發
      console.log('Button clicked');
    };
  
    return <button onClick={handleClick}>Click Me</button>;
  }


// Rule #2 – If a side effect is synchronizing your component with some outside system, put that side effect inside useEffect
// 規則 #2：如果副作用是用於與外部系統同步組件，將該副作用放在 useEffect 中。例如，從 API 獲取數據：

function DataFetchingComponent() {
    useEffect(() => {
      // 副作用在 useEffect 中觸發
      fetchData();
    }, []);
  
    return <div>Data will be fetched here</div>;
  }


// Rule #3 – If a side effect is synchronizing your component with some outside system and that side effect needs to run before the browser paints the screen, put that side effect inside useLayoutEffect
// 規則 #3：如果副作用是用於與外部系統同步組件，並且該副作用需要在瀏覽器繪製畫面之前運行，則將該副作用放在 useLayoutEffect 中。如，進行 DOM 渲染前的計算：

function LayoutEffectComponent() {
    useLayoutEffect(() => {
      // 副作用在 useLayoutEffect 中觸發
      calculateLayout();
    }, []);
  
    return <div>Layout will be calculated here</div>;
  }
  

// Rule #4 – If a side effect is subscribing to an external store, use the useSyncExternalStore hook
// 規則 #4：如果副作用是訂閱外部存儲，則使用 useSyncExternalStore 鉤子。例如，訂閱 Redux 或其他狀態管理庫的狀態變化：

function SubscribeToStoreComponent() {
    useSyncExternalStore(() => {
      // 副作用在 useSyncExternalStore 中觸發
      subscribeToStoreChanges();
    });
  
    return <div>Subscribed to store changes</div>;
  }
  