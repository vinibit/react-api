import axios from "axios"

const http = axios.create({

    baseURL: "http://localhost:8000/api/v2",    
    headers: {    
        "Content-type": "application/json"
        }    
})

export default http