import axios from "axios"

export default {
    get(search_string = 'random', page = 1) {

        return axios.get('http://127.0.0.1:8000/api/feed/search_user/', {
            params: {
                search_string,
                page

            }
        })
    }
}