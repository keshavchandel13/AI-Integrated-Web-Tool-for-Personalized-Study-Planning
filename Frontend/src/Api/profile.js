import axios from "axios";


const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export default async function fetchUserData(jwtid) {
    try{
        const res = await axios.get(`${VITE_BACKEND_URL}/api/user/getuser`,{
            headers:{
                Authorization: `Bearer ${jwtid}`
            }
        })
        return res.data
    }
    catch(err){
        throw err;
    }
}
