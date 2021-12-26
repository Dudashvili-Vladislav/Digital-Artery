import axios from "axios"

export default {
    get() {
        return axios.get('http://127.0.0.1:8000/auth/user')
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