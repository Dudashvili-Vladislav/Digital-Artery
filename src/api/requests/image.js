import axios from "axios"

export default {
    get(id) {
        return axios.get(`post/detail/${id}/`)
    },
    create(data) {
        return axios.post('/post/create/',data)

    }
}