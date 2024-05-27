// How would you update a nested object that is stored as React state?

// When you pass a value to useState's updater function, whatever value you pass will always replace the current piece of state. What this means is that if you have a piece of state that is an object, it won't be merged with the current state.

const [user, setUser] = React.useState({
    id: 1,
    name: "Tyler McGinnis",
    email: "tyler@ux.dev"
  })
  const handleUpdateEmailIncorrectly = (email) => {
    /*
      This will overwrite our user state
      with { email }.
    */
    setUser({ email })
  }

//   Instead of replacing the object, you most likely want to merge the new value with the existing state object. To do that, we can use JavaScript's spread operator to spread all of the existing key/value pairs onto a new object, then pass that new object to the updater function.

const handleUpdateEmail = (email) => {
    const updatedUser = {
      ...user,
      email: "tyler@ui.dev"
    }
    setUser(updatedUser) // 🫡
  }

  