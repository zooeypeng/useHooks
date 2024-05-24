// What types of data can you pass as props?

// It's just JavaScript, baby. Do whatever you want.

{/*

<PrimaryButton onClick={handleSubmit}>
  Submit
</PrimaryButton>
<Profile uid="tm" authed={false} />
<Modal>
  <Header title="Join the Newsletter" />
  {children}
</Modal>
<Icon type={IconTypes.SUCCESS} />
<Hover render={{(hovering) => {
  return hovering === true
    ? <i>"children" can be functions too</i>
    : <i>It's "just JavaScript", after all.</i>
}}} />
<Table id="users">
  <Table.Header>
    <Table.Row>
      <Table.Cell>First Name</Table.Cell>
      <Table.Cell>Last Name</Table.Cell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Tyler</Table.Cell>
      <Table.Cell>McGinnis</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>

你可以將各種類型的數據作為 props 傳遞給 React 組件。這些數據類型包括：

1. **基本數據類型**：如字符串（String）、數字（Number）、布爾值（Boolean）、null 和 undefined。

2. **對象**：可以將 JavaScript 對象作為 props 傳遞給組件，這些對象可以包含任意類型的數據，如鍵值對、嵌套對象等。

3. **函數**：可以將函數作為 props 傳遞給組件，這使得組件能夠與父組件或其他組件進行通信，以實現回調函數等功能。

4. **數組**：可以將數組作為 props 傳遞給組件，這使得組件能夠接收多個值或項目。

總的來說，React 中的 props 可以是任何 JavaScript 支持的數據類型，這使得組件之間可以方便地共享數據和功能。 */}