export const currentUser = (state = { logoUser: null }, action) => {
    switch (action.type) {
        case "SET_CURRENT_USER":
            return { ...state, logoUser: action.payload }

        default:
            return state
    }
}