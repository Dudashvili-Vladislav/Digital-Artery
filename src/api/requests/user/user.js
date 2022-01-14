import axios from "axios"

export default {
    get(username) {
        return axios.get(`http://127.0.0.1:8000/api/user/detail/${username}`)
    }
}