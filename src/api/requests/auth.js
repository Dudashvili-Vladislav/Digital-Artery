import axios from "../instanse"

export default {
    get() {
        return axios.get(' http://127.0.0.1:8000/api/user/detail/default/')
    },


    create(token) {
        try {
            return axios.post(`http://127.0.0.1:8000/api/user/token/`, {
                password: token,
                username: 'default'
            })
        }
        catch (e) {
            return e
        }
    }

}