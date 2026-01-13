import axios from "axios";
import { defaults } from "chart.js";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export default async function fetchUserData() {
    try{
        const userData = axios.get(`${VITE_BACKEND_URL}`)


    }
    catch(err){
        throw err;
    }
}
