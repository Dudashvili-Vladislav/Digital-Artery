export const currentImage = (state = { image: null }, action) => {
    switch (action.type) {
        case "SET_CURRENT_IMAGE":
            return { ...state, image: action.payload }

        default:
            return state
    }
}