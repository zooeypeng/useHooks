// Why are regular variables insufficient for reacting to user interactions in a React component?
// 為什麼在 React 組件中使用普通的變量（非 React 的狀態）來響應用戶的操作是不夠的。


// For a few different reasons.

// React has no way of knowing when regular variables change and is therefore unable to trigger a re-render when they do.
// Normal variables don't get persisted across renders.

// React 無法知道正常的變量何時發生變化，因此無法在它們發生變化時重新渲染組件。就像一個故事中的角色，React 只能看到特殊的"魔法"狀態，這些狀態是 React 自己能夠掌握和跟蹤的。而一般的變量對於 React 來說就像是一個看不見的角色，因此它們的改變不會被 React 感知到。

// 另外，正常的變量在組件重新渲染時不會被保留，就像是一個人在每次看到一個場景時都忘記了前一次的事情。這意味著即使你在上一次渲染中設置了一個變量的值，但當組件重新渲染時，這個值也會被重置，並且不會被保留下來。



// 正規變量不足以響應 React 組件中的用戶交互，因為它們無法觸發組件的重新渲染。在 React 中，組件的狀態（state）起著非常重要的作用，當狀態發生變化時，React 會自動重新渲染相應的組件。而正規變量並不具有這種能力，它們只是存儲數據的容器，並不能通知 React 進行重新渲染。

// 簡而言之，React 的組件需要能夠對用戶交互作出反應，並根據交互產生的變化來更新 UI。狀態（state）提供了一種有效的方式來實現這一點，因為它們能夠觸發組件的重新渲染，從而使 UI 能夠及時地反映最新的狀態。