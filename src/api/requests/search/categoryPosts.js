import axios from "axios"

export default {
    get(search_string = 'test1', page = 1) {
        return axios.get('feed/category_search_post/', {
            params: {
                search_string, page
            }
        })
    }
}