const initialState = {
  users:[]
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case "ADD_USER":
        return { ...state, ...payload }
    case "REMOVE_USER":
      state.map
    default:
        return state
    }
}
