import { BASE_URL } from "../config/baseApi";
import api from "./api";

const API_URL = `${BASE_URL}/api/v1`;

export const logOutBackend = async () => {
  const response = await api.post(`${API_URL}/auth/refresh/logout`);
  return response.data;
};
