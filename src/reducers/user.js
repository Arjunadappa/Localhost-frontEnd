const userReducer =  (state = {}, action) => {
    switch (action.type) {

        case "LOGIN":
            return {
                id: action.id
            }
        case "LOGOUT":
            return {}
        default:
            return state
    }
}

export default userReducer