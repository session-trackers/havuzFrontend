import axios from "axios";
import { BASE_URL } from "../config/baseApi";
import api from "./api";

const API_URL = `${BASE_URL}/api/v1/session`;

export const fetchSeanses = async (item) => {
  const response = await api.post(`${API_URL}/filter`, item);
  return response.data;
};

export const fetchSeansesByPaketId = async (id) => {
  const response = await api.get(
    `${BASE_URL}/api/v1/package/package-session?packageId=${id}`
  );
  return response.data;
};

export const fetchSeansesByDate = async (date) => {
  const response = await api.get(`${API_URL}/local-date?date=${date}`);
  return response.data;
};

export const fetchSeansesByDateHoca = async (date) => {
  const response = await api.get(`${API_URL}/hoca-local-date?date=${date}`);
  return response.data;
};

export const fetchSeansesList = async () => {
  const response = await api.get(`${API_URL}/list`);
  return response.data;
};

export const fetchSeansesNoList = async () => {
  const response = await api.get(`${API_URL}/no-list`);
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

export const apiChangeUsersInSeans = async (data) => {
  const response = await api.post(
    `${BASE_URL}/api/v1/customer-package/change-session`,
    data
  );
  return response.data;
};
