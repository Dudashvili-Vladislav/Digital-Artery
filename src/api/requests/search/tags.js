import axios from "axios"

export default {
    get() {
        return axios.get('feed/tags/')
    },
    create() {

    }
}