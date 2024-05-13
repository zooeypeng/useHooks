Hint #1 – set
Part of the return value of useList is a set function that allows the user to set the list to a new value. This one is pretty simple. It just takes in a new value, l, and calls setList with it.

The only thing to remember is that it's good practice whenever you're building a custom hook to memoize any functions you return so that they'll stay referentially consistent across renders and therefore, won't break any React.memos that the consumer of the hook has.

const set = React.useCallback((l) => {
  setList(l);
}, []);

Hint #2 – push
Part of the return value of useList is a push function that allows the user to push a new element onto the end of the list.

To prevent having to pass the current list as a dependency to useCallback we can use setList's updater function, spreading all of the existing values onto a new array and then adding the new element to the end.

const push = React.useCallback((element) => {
  setList((l) => [...l, element]);
}, []);

Hint #3 – removeAt
Part of the return value for useList is a removeAt function that allows the user to remove an element at a given index.

To do this, we can use setList's updater function, spreading all of the existing values onto a new array, but excluding the element at the given index.

const removeAt = React.useCallback((index) => {
  setList((l) => [...l.slice(0, index), ...l.slice(index + 1)]);
}, []);

Hint #4 – insertAt
Part of the return value for useList is an insertAt function that allows the user to insert an element at a given index.

To do this, we can use setList's updater function, spreading all of the existing values onto a new array, but including the new element at the given index.

const insertAt = React.useCallback((index, element) => {
  setList((l) => [...l.slice(0, index), element, ...l.slice(index)]);
}, []);

Hint #5 – updateAt
Part of the return value for useList is an updateAt function that allows the user to update an element at a given index.

To do this, we can use setList's updater function, mapping over the existing values and replacing the one at the given index with the new element.

const updateAt = React.useCallback((index, element) => {
  setList((l) => l.map((e, i) => (i === index ? element : e)));
}, []);

Hint #6 – clear
Part of the return value for useList is a clear function that allows the user to clear the list.

To do this, we can simply pass an empty array to setList.

const clear = React.useCallback(() => setList([]), []);