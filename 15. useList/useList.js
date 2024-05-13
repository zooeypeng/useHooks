import * as React from "react";

const placeholder = () => {};

export default function useList(defaultList = []) {
  const [list, setList] = React.useState(defaultList);

  const set = React.useCallback((newList) => {
    setList(newList);
  }, []);

  const push = React.useCallback((item) => {
    setList((l) => [...l, item]);
  }, []);

  const removeAt = React.useCallback((idx) => {
    setList((l) => l.toSpliced(idx, 1));
  }, []);

  const insertAt = React.useCallback((idx, item) => {
    setList((l) => l.toSpliced(idx, 0, item));
  }, []);

  const updateAt = React.useCallback((idx, item) => {
    setList((l) => l.toSpliced(idx, 1, item));
  }, []);

  const clear = React.useCallback(() => {
    setList([]);
  }, []);

  return [list, { set, push, removeAt, insertAt, updateAt, clear }];
}
