const initialState = {
  users:[]
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case "ADD_USER":
        return { ...state, ...payload }
    case "ADD_SCORE":
        state.users.map((user)=>{
          if (user.id === payload.id){
            return payload
          }
          return user
        }) 
        return state   
    case "REMOVE_USER":
      state.map
    default:
        return state
    }
}
