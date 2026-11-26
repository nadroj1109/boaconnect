import axios from "axios";

const sanctum = axios.create({

    baseURL: import.meta.env.VITE_APP_URL,
    // baseURL: "http://127.0.0.1:8000",

    withCredentials: true,

    withXSRFToken: true,

});

export default sanctum;