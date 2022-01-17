import axios from "axios"

export default {
    get(id) {
        return axios.get(`post/detail/${id}/`)
    }
}