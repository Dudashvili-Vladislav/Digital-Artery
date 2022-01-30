import axios from "axios"

export default {
    create(user) {
        return axios.post('/feed/follow/', `user_id=${user}`)
    }
}