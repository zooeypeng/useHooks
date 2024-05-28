// If React.memo isn't working appropriately, what is the most likely cause?

// A prop being passed to the component wrapped in React.memo is a reference value whose reference is changing on every render.
// 因為被傳遞給 React.memo 包裹的組件的 prop 是一個reference value，而這個引用在每次渲染時都在變化。這使得 React.memo 無法進行有效的比較，導致組件在每次渲染時都被重新渲染。

// "Reference value" 指的是一種在程式中表示的數據類型，這種數據類型不直接存儲數據值，而是存儲數據的引用或地址。在 JavaScript 中，對象（Object）、陣列（Array）、函數（Function）等都是引用值。當你將一個引用值傳遞給其他變量或函數時，實際上是傳遞了對該值的引用或地址，而不是值本身的複本。這意味著當你改變一個引用值的時候，所有引用該值的地方都會反映這個改變，因為它們都指向同一個內存地址。