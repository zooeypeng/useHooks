// What causes a React component to re-render?

// When the state of a component changes.

// 引起 React 組件重新渲染的原因有以下幾種：

// 狀態（State）變化：當組件的狀態改變時，React 會重新渲染該組件，以反映狀態的變化。

// 屬性（Props）變化：當父組件傳遞給子組件的屬性發生變化時，子組件會重新渲染，以更新顯示的內容。

// 父組件重新渲染：如果父組件重新渲染，無論子組件的屬性是否改變，子組件通常也會重新渲染。

// 強制更新（Force Update）：使用 forceUpdate() 方法可以強制組件重新渲染。這種方法應謹慎使用，因為它會跳過應該優化的部分。

// 上下文（Context）變化：當使用 Context API 並且 Context 的值改變時，所有消費該 Context 值的組件都會重新渲染。

// 這些情況都會導致 React 組件重新調用其 render 方法（或函數式組件的函數），從而更新視圖。以下是每種情況的簡單示例：

// 狀態變化：

function MyComponent() {
    const [count, setCount] = React.useState(0);

    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>Increase</button>
        </div>
    );
}


// 屬性變化：

function ParentComponent() {
    const [text, setText] = React.useState("Hello");

    return <ChildComponent text={text} />;
}

function ChildComponent({ text }) {
    return <p>{text}</p>;
}

// 父組件重新渲染：

function ParentComponent() {
    const [count, setCount] = React.useState(0);

    return (
        <div>
            <ChildComponent />
            <button onClick={() => setCount(count + 1)}>Re-render Parent</button>
        </div>
    );
}

function ChildComponent() {
    console.log("Child re-rendered");
    return <p>Child Component</p>;
}

// 強制更新：

class MyComponent extends React.Component {
    forceReRender = () => {
        this.forceUpdate();
    };

    render() {
        return (
            <div>
                <p>Force re-render</p>
                <button onClick={this.forceReRender}>Force Update</button>
            </div>
        );
    }
}

// 上下文變化：

const MyContext = React.createContext();

function ParentComponent() {
    const [value, setValue] = React.useState("Hello");

    return (
        <MyContext.Provider value={value}>
            <ChildComponent />
            <button onClick={() => setValue("World")}>Change Context</button>
        </MyContext.Provider>
    );
}

function ChildComponent() {
    const value = React.useContext(MyContext);
    return <p>{value}</p>;
}

// 總結來說，React 組件的重新渲染由狀態、屬性、父組件的重新渲染、強制更新以及上下文變化等原因引起，這些變化使得 React 可以動態更新和重新渲染組件以反映最新的數據和狀態。