import axios from "axios"
import loader from "./loader"

const http = axios.create({

    baseURL: "http://localhost:8000/api/v2",
    headers: {
        "Content-type": "application/json"
    }
})

http.interceptors.request.use(
    (config: any) => {        
        loader.start()        
        return config
    },
    (error: any) => {
        loader.stop()        
        return error
    }
)

http.interceptors.response.use(
    (res) => {        
        loader.stop()        
        return res
    },
    (err) => {        
        loader.stop()        
        return Promise.reject(err)
    }
)

export default http