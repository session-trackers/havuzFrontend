import axios from "axios";
import { BASE_URL } from "../config/baseApi";
import api from "./api";

const API_URL = `${BASE_URL}/api/v1/coach`;

export const fetchKadro = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

export const apiCreateHoca = async (item) => {
  const response = await api.post(`${API_URL}`, item, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateHocaText = async (id, item) => {
  const response = await api.put(`${API_URL}?id=${id}`, item);
  return response.data;
};

export const deleteHoca = async (id) => {
  //   const response = await api.delete(`${API_URL}?id=${id}`);
  //   return response.data;
};

export const updateHocaImage = async (image) => {
  const response = await api.put(`${API_URL}/cover-image`, image, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteCoverImgHoca = async (id) => {
  //   const response = await api.put(`${API_URL}/image?id=${id}`);
  //   return response.data;
};
