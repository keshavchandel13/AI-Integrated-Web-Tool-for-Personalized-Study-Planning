import api from "./axios";

// Fetch quiz for topic
export const getQuiz = async (topicId) => {
  const res = await api.get(`/quiz?topic_id=${topicId}`);
  return res.data;
};

// Generate quiz if not exists
export const generateQuiz = async (data) => {
  const res = await api.post(`/quiz`, data);
  return res.data;
};

// Push progress (score, completion)
export const updateProgress = async (payload) => {
  const res = await api.post(`/progress/update`, payload);
  return res.data;
};
