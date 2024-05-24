// What are the most common techniques used to conditionally render UI in React?

// The most basic example is just using a simple if/else statement.
function Dashboard () {
  const user = useAuth()
  if (user?.firstLogin === true) {
    return <h1>👋 Welcome!</h1>
  } else if (user) {
    return <h1>Welcome back!</h1>
  } else {
    return  <h1>Login to see your dashboard</h1>
  }
}

// If you're rendering different UI based on a single condition, typically you'd use JavaScript's ternary operator.
function Dashboard () {
  const user = useAuth()
  return user
    ? <h1>Welcome back!</h1>
    : <h1>Login to see your dashboard</h1>
}

// You can also use JavaScript's logical && operator.
function Dashboard () {
  return (
    <React.Fragment>
      <Logo />
      {showWarning() === true && <Warning />}
    </React.Fragment>
  )
}


// 在 React 中，條件渲染 UI 的最常見技巧包括以下幾種：

// 1. **條件渲染**：使用 JavaScript 中的條件表達式（如 `if`、`else`、`switch`）來根據條件動態決定渲染哪些元素或組件。

// 2. **三元運算符**：使用 JavaScript 中的三元運算符（`condition ? trueValue : falseValue`）來根據條件選擇性地渲染不同的元素或組件。

// 3. **邏輯運算符 &&**：使用 JavaScript 中的邏輯與運算符（`&&`）來根據條件渲染特定的元素或組件。當條件為真時，返回需要渲染的元素或組件，否則返回 `null` 或 `false`。

// 4. **if-else 語句**：在 JSX 中使用 JavaScript 的 if-else 語句來條件渲染 UI。這需要將整個邏輯放入 render 方法中。

// 5. **使用條件渲染的 Hook**：使用 React 中提供的條件渲染 Hook，如 `useMemo`、`useEffect` 和 `useCallback` 等，根據依賴的變化來動態地渲染 UI。

// 這些都是在 React 中進行條件渲染的常見技巧，開發者可以根據項目的特定需求和個人喜好來選擇適合的方法。