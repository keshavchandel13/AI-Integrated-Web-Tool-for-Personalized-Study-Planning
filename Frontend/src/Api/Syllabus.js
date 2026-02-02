import api from "./axios";

export const addsyllabus = async (formData) => {
  try {
    const response = await api.post(`/syllabus/addsyllabus`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding syllabus:", error);
    throw error;
  }
};
;
export const getsyllabus = async (subject_id) => {
  try {
    const response = await api.get(`/syllabus/getsyllabus`, {
      params: { subject_id: subject_id }, 
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching syllabus:", error);
    throw error;
  }
};