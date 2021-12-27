import axios from "../instanse"

export default {
    get() {
        return axios.get('http://127.0.0.1:8000/api/feed/posts_trending/ ')
    }
}