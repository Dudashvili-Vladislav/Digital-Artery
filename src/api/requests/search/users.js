import axios from "axios"

export default {
    get(search_string = 'random', page = 1) {

        return axios.get('feed/search_user/', {
            params: {
                search_string,
                page

            }
        })
    }
}