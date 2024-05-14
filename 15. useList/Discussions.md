Mads Hoel
7 months ago

Why isn't the following working correctly?

const removeAt = React.useCallback((index) => setList((l) => l.splice(index, 1)), []);

Avatar for Mads Hoel
Mads Hoel
7 months ago

My guess is that React doesn't like that I mutated the original list. Using toSpliced instead of splice worked better.

const removeAt = React.useCallback((index) => setList((l) => l.toSpliced(index, 1)), []);


❤️
2
MP
matt pham
7 months ago

Yup, every new state has to be a new object since React just uses Object.is() to check if the new state is different from the previous state.


Avatar for Josiah Smith
Josiah Smith
6 months ago

I used toSpliced() as well, I think it is perfect for this scenario


Avatar for Ronan Moris
Ronan Moris
6 months ago

toSpliced works pretty well for inserAt and updateAt too:

  const insertAt = (index, value) => setList((list) => list.toSpliced(index, 0, value));
  const updateAt = (i, value) => setList((list) => list.toSpliced(i, 1, value));



