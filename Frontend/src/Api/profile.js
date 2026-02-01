import api from "./axios";
export default async function fetchUserData(jwtid) {
    try{
        const res = await api.get(`/user/getuser`,{
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
