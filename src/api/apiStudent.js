import { BASE_URL } from "../config/baseApi";
import api from "./api";

const API_URL = `${BASE_URL}/api/v1/customer`;

export const apiFetchStudent = async () => {
  const response = await api.get(`${API_URL}`);
  return response.data;
};

export const apiFetchStudentById = async (id) => {
  const response = await api.get(`${API_URL}/by-id?customerId=${id}`);
  return response.data;
};

export const apiFetchStudentByPaketId = async (id) => {
  const response = await api.get(`${API_URL}-package/customer?packageId=${id}`);
  return response.data;
};

// Devamsızlık yapan ogrenciler
export const apiFetchStudentByDevamsizlik = async (formData) => {
  const response = await api.get(
    `${BASE_URL}/api/v1/attendance/date?startDate=${formData.startDate}&endDate=${formData.endDate}`
  );
  return response.data;
};

// Devamsızlık içinn sessionId'ye göre öğrencileri çeker
export const apiFetchStudentBySessionId = async (id) => {
  const response = await api.get(
    `${BASE_URL}/api/v1/attendance/session-id?sessionId=${id}`
  );
  return response.data;
};

//Devamsızlık Checked
export const apiCheckedStudentBySessionId = async (data) => {
  const response = await api.put(`${BASE_URL}/api/v1/attendance/check`, data);
  return response.data;
};

export const apiCreateStudent = async (item) => {
  const response = await api.post(`${API_URL}`, item, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateStudentText = async (id, item) => {
  const response = await api.put(`${API_URL}?customerId=${id}`, item);
  return response.data;
};

export const updateStudentImage = async (id, image) => {
  const response = await api.put(`${API_URL}/identity-image?id=${id}`, image, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
