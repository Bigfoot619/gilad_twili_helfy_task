import axios from "axios";

const BASE_API_URL = "http://localhost:4000/api/tasks";

export const getTasks = async () => {
  const response = await axios.get(BASE_API_URL);
  return response.data;
};

export const createTask = async (task) => {
  const response = await axios.post(BASE_API_URL, task);
  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await axios.put(`${BASE_API_URL}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${BASE_API_URL}/${id}`);
};

export const toggleTask = async (id) => {
  const response = await axios.patch(`${BASE_API_URL}/${id}/toggle`);
  return response.data;
};