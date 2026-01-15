import axios from "axios";
import { defaults } from "chart.js";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export default async function fetchUserData(id) {
    try{
        const res = await axios.get(`${VITE_BACKEND_URL}/profile/${id}`)
        return res.data
    }
    catch(err){
        throw err;
    }
}
