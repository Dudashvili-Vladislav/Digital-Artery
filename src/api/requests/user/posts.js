import axios from "axios"

export default {
    get(username) {
        return axios.get(`user/posts/${username}/`)
    }
}