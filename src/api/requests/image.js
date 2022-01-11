import axios from "axios"

export default {
    get(id) {
        return axios.get('http://127.0.0.1:8000/api/image/', {
            params: {
                id
            }
        })
    }
}