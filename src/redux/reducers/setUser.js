const initialState = {
    id: 1
}

export const setUser = (state = initialState, { id, type }) => {

    switch (type) {
        case "SET_USER":
            return {
                ...state, id
            }
    }
    return state
}