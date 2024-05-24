// What are children in React?

// When you create an element, anything that is between the opening and closing tag of that element is considered children and is accessible in that component via props.children.

{/* 

<Header>This text is "children"</Header>

<Layout>
  <h1>Now "children"</h1>
  <p>is an array of elements</p>
</Layout>

<Hover>
  {(hovering) => {
    return hovering === true
      ? <i>"children" can be functions too</i>
      : <i>It's "just JavaScript", after all.</i>
  }}
</Hover>


You can think of a component with a children prop as having a placeholder that can be filled by its parent component. Because of this, it's common to utilize children to create Layout type components that encapsulate styling and logic, but leave the content to the consumer of the component.

<Modal onClose={handleClose}>
  <h1>Modal is Customizable</h1>
  <p><i>children</i> can be whatever we want.</p>
  <p>(and it can be different each time we use Modal)</p>
</Modal> 

*/}

// 在 React 中，children 是指在父組件中包含的子組件或子元素。它可以是任何類型的 React 元素，包括其他組件、原生 DOM 元素或者文字內容。children 提供了一種將組件結構化的方式，使得父組件可以包含和管理多個子組件或元素，從而構建更加靈活和可重用的 UI。