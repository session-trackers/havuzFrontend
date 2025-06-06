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

export const apiGetPakets = async () => {
  const response = await api.get(`${API_URL}`);
  return response.data;
};

export const apiGetPaketByPaketId = async (id) => {
  const response = await api.get(`${API_URL}/by-id?id=${id}`);
  return response.data;
};

export const apiListPaketByUserId = async (kullaniciId) => {
  const response = await api.get(
    `${BASE_URL}/api/v1/customer-package/package?customerId=${kullaniciId}`
  );
  return response.data;
};

export const apiDeletePaketById = async (paketId, userId) => {
  const response = await api.delete(
    `${BASE_URL}/api/v1/customer-package/remove-customer?customerId=${userId}&packageId=${paketId}`
  );
  return response.data;
};

export const apiCreateUsersInPaket = async (paketId, userIds) => {
  const response = await api.post(
    `${BASE_URL}/api/v1/customer-package/admin-add-list?packageId=${paketId}`,
    userIds
  );
  return response.data;
};

export const apiDeleteUsersInPaket = async (paketId, userIds) => {
  const response = await axios.delete(
    `${BASE_URL}/api/v1/customer-package/remove-customer-list`,
    {
      params: { packageId: paketId },
      data: {
        customerIds: userIds,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const updatePaketText = async (id, item) => {
  const response = await api.put(`${API_URL}?packageId=${id}`, item);
  return response.data;
};

export const updatePaketCoverImage = async (image) => {
  const response = await api.put(`${API_URL}/cover-image`, image, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateImgsPaket = async (id, newFile) => {
  const response = await api.put(
    `${API_URL}/package-images?id=${id}`,
    newFile,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data;
};
