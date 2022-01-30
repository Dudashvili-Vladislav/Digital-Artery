import axios from "axios"

export default {
    create(post_id) {
        return axios.post('http://92.255.109.134:3000/api/like/create/', `post=${post_id}`)
    }
}