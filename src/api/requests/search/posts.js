import axios from "axios"

export default {
    get(search_string = 'random', page = 1) {
        return axios.get('feed/search_post/', {
            params: {
                search_string, page
            }
        })
    }
}