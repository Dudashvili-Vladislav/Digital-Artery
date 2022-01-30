import axios from "axios"

export default {
    put(data, id) {
        const body = new FormData()
        for (let i in data) {
            if (Array.isArray(data[i])) {
                data[i].forEach(el => body.append('images', el.file))
            }
            else {
                body.append(i, data[i])
            }

        }
        return axios.put(`http://92.255.109.134:3000/api/post/update/${id}/`, body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}