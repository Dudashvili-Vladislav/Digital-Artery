
export const actions = {
    setUser: (id) => { return { type: 'SET_USER', id } },
    setCurrentImage: (logoUser) => { return { type: 'SET_CURRENT_USER', payload: logoUser } }
}
