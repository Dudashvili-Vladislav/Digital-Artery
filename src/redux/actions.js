
export const actions = {
    setUser: (id) => { return { type: 'SET_USER', id } },
    setCurrentImage: (image) => { return { type: 'SET_CURRENT_IMAGE', payload: image } }
}
