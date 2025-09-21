import axios from 'axios'
const url = `${import.meta.env.VITE_BACKEND_URL}`
export const login = async ({ email, password }) => {
    try {
        const res = await axios.post(`${url}/login`,
            { email, password },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
        return res.data;

    } catch (err) {
        console.error("Error in login:", err);
        throw err;
    }
}

export const signup = async ({ name, email, password }) => {
    try {
        const res = await axios.post(`${URLSearchParams}/signup`,
            { name, email, password },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials:true
            });
            return res.data;

    }
    catch (err) {
        console.log("Error in signup: ", err)
        throw err;
    }

}
