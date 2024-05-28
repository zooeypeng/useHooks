// How would you integrate a custom data store into your React application?

// This would be the perfect use case for React's useSyncExternalStore hook.

import * as React from "react
import customStore from './store.js';
export default function Component() {
  const store = useSyncExternalStore(customStore.subscribe, customStore.getSnapshot);
  
  ...
}

// useSyncExternalStore 鉤子：這個鉤子用來訂閱外部數據存儲並獲取其最新快照，確保在數據變化時組件能夠重新渲染。
// customStore.subscribe：這是自定義存儲的訂閱方法，當存儲的數據發生變化時會觸發回調。
// customStore.getSnapshot：這是獲取自定義存儲當前狀態的快照方法。

import * as React from "react";
import customStore from './store.js';

export default function Component() {
  const store = React.useSyncExternalStore(
    customStore.subscribe,
    customStore.getSnapshot
  );

  // 可以在這裡使用 `store` 中的數據
  return (
    <div>
      <pre>{JSON.stringify(store, null, 2)}</pre>
    </div>
  );
}

// 這樣的實現方式：

// 使用 useSyncExternalStore 鉤子確保 React 能夠正確地響應外部狀態的變化。
// 提供了訂閱和獲取快照的方法，使得自定義存儲與 React 的渲染流無縫集成。
// 這是一種現代且高效的方法來管理和同步外部狀態，使得您的 React 應用更加健壯和易於維護。