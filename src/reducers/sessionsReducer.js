const initialState = {
    currentUser: {},
    loggedIn: false
}

 const sessionsReducer= (  state = initialState, { type, payload }) => {
    switch (type) {

    case 'LOGIN':
        return {
            currentUser: payload,
            loggedIn: true           
        }
    case 'LOGOUT':
        return initialState
    default:
        return state
    }
}
export default sessionsReducer;
