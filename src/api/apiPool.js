import axios from "axios";
import { BASE_URL } from "../config/baseApi";
import api from "./api";

const API_URL = `${BASE_URL}/api/v1/pool`;

export const fetchPools = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

export const apiCreatePool = async (item) => {
  const response = await api.post(`${API_URL}`, item, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updatePoolText = async (id, item) => {
  const response = await api.put(`${API_URL}?id=${id}`, item);
  return response.data;
};

export const deletePool = async (id) => {
  //   const response = await api.delete(`${API_URL}?id=${id}`);
  //   return response.data;
};

export const updatePoolCoverImage = async (image) => {
  const response = await api.put(`${API_URL}/cover-image`, image, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteCoverImgPool = async (id) => {
  //   const response = await api.put(`${API_URL}/image?id=${id}`);
  //   return response.data;
};

export const updateImgsPoll = async (id, newFile) => {
  const response = await api.put(`${API_URL}/pool-images?id=${id}`, newFile, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
