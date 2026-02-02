import api from "./axios"; 

export const generatePlanforsubject = async (subjectId) => {
  try {
    const response = await api.post(`/studyplan/generateplan`, { subject_id: subjectId }, {
  headers: { "Content-Type": "application/json" },
});

    return response.data; 
  } catch (error) {
    console.error("Error in Generating Plan:", error);
    throw error; 
  }
};

export const getstudyplan = async(subjectId) =>{
  try{
    const res = await api.get(`/studyplan/getstudyplan`,{
    params: { subject_id: subjectId },
    });
    return res.data;
  }
  catch(err){
    console.log("There is error in fetching the study plan", err)
    throw err;

  }
}

export const completedTopic = async (data) => {
  try {
    const res = await api.post(`/studyplan/topiccompleted`, data);
    return res.data;
  } catch (e) {
    console.error("Error marking topic completed:", e);
  }
};

export const getSubjectProgress = async (userId, subjectId) => {
  const res = await api.get(`/progress/${userId}/${subjectId}`);
  return res.data;
};

