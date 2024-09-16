import axios from "axios";

const pythonApi = axios.create({
    baseURL:"https://vite-app-tcc-senai-2q6k.vercel.app/",

});

export default pythonApi;