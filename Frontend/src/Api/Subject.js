import api from "./axios";
export const addSubject = async (subjectData) => {
  try {
    const response = await api.post(`/subject/addsubject`, subjectData, {
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
    const response = await api.get(`/subject/getsubjects`, {
      params: { user_id: userId }, 
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching subjects:", error);
    throw error;
  }
};