import axios from "axios";
import { BASE_URL } from "../config/baseApi";
import api from "./api";

const API_URL = `${BASE_URL}/api/v1/package`;

export const apiCreatePaket = async (formData) => {
  const response = await api.post(`${API_URL}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
