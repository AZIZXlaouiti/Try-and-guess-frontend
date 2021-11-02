const initialState = {
    currentUser: {},
    users: [],
    loggedIn: false
}

 const sessionsReducer= (  state = initialState, { type, payload }) => {
    switch (type) {

    case 'LOGIN':
        return {
            ...state,
            currentUser: payload,
            loggedIn: true           
        }
    case 'LOGOUT':
        return initialState
    case "ADD_USER":
        return { ...state, users: payload }
    case "REMOVE_USER":
        const found = state.users.filter(user=>{
         return  user.id !== payload
        })
        return {...state , users: found}
    default:
        return state
    }
}
export default sessionsReducer;
