import axios from "axios"


export default {
    get(id) {
        return axios.get(`post/detail/${id}/`)
    },
    create(data) {
        const formData = new FormData()
        for (let i in data) {
            if (Array.isArray(data[i]))
                data[i].forEach(el => formData.append('images', el))
            else formData.append(i, data[i])
        }

        return axios.post('/post/create/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

    }
}