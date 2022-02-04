import axios from "axios"

export default {
    get(user) {
        return axios.get(`user/following/${user || 'default'}/`)
    },
    create(dataUser) {
        ////..... 
    }

}