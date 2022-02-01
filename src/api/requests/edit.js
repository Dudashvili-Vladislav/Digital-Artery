import axios from "axios"


export default {
    put(data, id) {

        const body = new FormData()
        for (let i in data) {
            if (Array.isArray(data[i])) {
                
                data[i].forEach(element => {
                    if (!element.file) {
                        const filePath = element.substring(element.indexOf("post_images"), element.length)
                        body.append("to_delete", filePath)
                    }
                });
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

