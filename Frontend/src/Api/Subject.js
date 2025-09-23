import axios from "axios";

const url = `${import.meta.env.VITE_BACKEND_URL}`; 

export const addSubject = async (subjectData) => {
  try {
    const response = await axios.post(`${url}/api/subject/addsubject`, subjectData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error adding subject:", error);
    throw error; 
  }
};
export const getSubjects = async (userId) => {
  try {
    const response = await axios.get(`${url}/api/subject/getsubjects`, {
      params: { user_id: userId }, 
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching subjects:", error);
    throw error;
  }
};