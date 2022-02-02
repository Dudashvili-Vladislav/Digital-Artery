import axios from "axios"


export default {
    put(data, id) {
        const body = new FormData()
        for (let i in data) {
            if (i === "images") {
                data[i].forEach(el => body.append('images', el))

            } else if (i === "toDelete") {
                data[i].forEach(el => body.append('to_delete', el.substring(el.indexOf('post_images'), el.length)))

            } else {
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


const func = () => {
    new Proxy({
        id: {
            user: 1
        }
    }, {
        get(target, name) {
            if (typeof name === "object") {
                func()
            }
            return target.name
        },
        set(target, name, value) {

        }
    })

}

