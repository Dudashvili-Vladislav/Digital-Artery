import axios from "../instanse"

export default {
    get(user) {
        return axios.get(`http://127.0.0.1:8000/api/user/following/${user || 'default'}/`)
    },
    create(dataUser) {
        ////..... 
    }
}