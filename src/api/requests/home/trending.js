import axios from "axios"

export default {
    get() {
        return axios.get('feed/posts_trending/')
    }
}