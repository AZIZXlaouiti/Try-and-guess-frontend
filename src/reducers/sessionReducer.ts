

export const sessionReducer =  (state:User, { type, payload }) => {
    switch (type) {

    case "LOGIN":
        return { ...state, ...payload }
    case "LOGOUT":
        return {}
    default:
        return state
    }
}
