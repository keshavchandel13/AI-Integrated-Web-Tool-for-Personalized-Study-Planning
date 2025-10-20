import axios from "axios";

const API_BASE = "http://127.0.0.1:5000/api";

// Fetch quiz for topic
export const getQuiz = async (topicId) => {
  const res = await axios.get(`${API_BASE}/quiz?topic_id=${topicId}`);
  return res.data;
};

// Generate quiz if not exists
export const generateQuiz = async (data) => {
  const res = await axios.post(`${API_BASE}/quiz`, data);
  return res.data;
};

// Push progress (score, completion)
export const updateProgress = async (payload) => {
  const res = await axios.post(`${API_BASE}/progress`, payload);
  return res.data;
};
