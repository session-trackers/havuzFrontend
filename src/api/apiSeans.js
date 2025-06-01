import axios from "axios";
import { BASE_URL } from "../config/baseApi";
import api from "./api";

const API_URL = `${BASE_URL}/api/v1/session`;

export const fetchSeanses = async (item) => {
  const response = await axios.post(`${API_URL}/filter`, item);
  return response.data;
};

export const fetchSeansesList = async () => {
  const response = await axios.get(`${API_URL}/list`);
  return response.data;
};

export const apiCreateSeans = async (item) => {
  const response = await api.post(`${API_URL}`, item);
  return response.data;
};

export const apiUpdateSeans = async (item) => {
  const response = await api.put(`${API_URL}?id=${item.id}`, item);
  return response.data;
};
