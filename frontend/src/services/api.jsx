import axios from "axios";

const api = axios.create({
    baseURL:"https://vite-app-tcc-senai-qilv.vercel.app",

});

export default api;