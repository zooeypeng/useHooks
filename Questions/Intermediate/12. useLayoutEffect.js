// Describe a scenario where you'd want to use useLayoutEffect instead

// React guarantees that the code inside of useLayoutEffect, as well as any state updates scheduled within it, will be processed before the browser repaints the screen.

// React 保證在瀏覽器重新繪製屏幕之前，useLayoutEffect 內部的代碼以及其中安排的任何狀態更新都將被處理。這強調了 useLayoutEffect 在 DOM 更新階段同步觸發操作的能力，並確保這些操作在瀏覽器重新繪製之前完成，進而確保了正確的渲染和布局。

// 當你需要在 DOM 更新之前同步觸發一些操作時，你可能會想要使用 useLayoutEffect 而不是 useEffect。例如，當你需要計算 DOM 元素的尺寸或位置，並且這些計算結果將影響到後續渲染或動畫時，使用 useLayoutEffect 是一個不錯的選擇。

// 舉例來說，假設你正在開發一個圖表組件，在圖表更新時需要根據容器的尺寸重新計算圖表的大小和布局。這種情況下，你可以使用 useLayoutEffect 來確保在 DOM 更新之前計算容器尺寸，以確保圖表能夠正確地擁有所需的尺寸和位置。

// 總的來說，當你需要在 DOM 更新之前同步觸發一些操作時，特別是這些操作可能會影響到後續渲染或動畫的情況下，你可能會選擇使用 useLayoutEffect。