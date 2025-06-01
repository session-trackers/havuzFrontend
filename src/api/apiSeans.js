import axios from "axios";
import { BASE_URL } from "../config/baseApi";
import api from "./api";

// const API_URL = `${BASE_URL}/api/v1/category`;

export const fetchSeanses = async () => {
  //   const response = await axios.get(`${API_URL}/parent`);
  //   return response.data;
};

export const apiCreateSeans = async (item) => {
  //   const response = await api.post(`${API_URL}`, item, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });
  //   return response.data;
};

export const apiUpdateSeans = async (item) => {
  //   const response = await api.put(`${API_URL}`, item);
  //   return response.data;
};

export const deleteSeans = async (id) => {
  //   const response = await api.delete(`${API_URL}?id=${id}`);
  //   return response.data;
};
