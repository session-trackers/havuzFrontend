import axios from "axios";
import { setAccessToken, setLogout } from "../redux/slices/authSlice";
import { BASE_URL } from "../config/baseApi";
import { logOutBackend } from "./apiAuth";

let getAccessToken = () => null; // varsayılan
export const setAccessTokenGetter = (getterFn) => {
  getAccessToken = getterFn;
};

let dispatch = null;
export const setDispatcher = (dispatchFn) => {
  dispatch = dispatchFn;
};

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // HttpOnly refresh token kullanımı için
});

// 🔹 API İSTEKLERİNE ACCESS TOKEN EKLEME
api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 🔹 TOKEN SÜRESİ DOLUNCA OTOMATİK YENİLEME
let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (token) => {
  refreshSubscribers.map((callback) => callback(token));
  refreshSubscribers = [];
};

api.interceptors.response.use(
  (response) => response, // Başarılı cevapları aynen döndür
  async (error) => {
    const originalRequest = error.config;

    // 401 hatası (yetkisiz giriş)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Sonsuz döngüyü önlemek için işaret koy

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const res = await axios.post(
            `${BASE_URL}/api/v1/auth/refresh`,
            {},
            { withCredentials: true }
          );

          const newAccessToken = res.data.accessToken;
          dispatch?.(setAccessToken(newAccessToken));
          isRefreshing = false;
          onRefreshed(newAccessToken);

          return api(originalRequest); // Orijinal isteği yeni token ile tekrar gönder
        } catch (refreshError) {
          refreshSubscribers = []; // ❗️ temizlemeden önce reject edebilirsin
          await logOutBackend();
          dispatch?.(setLogout());
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve) => {
        refreshSubscribers.push((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(api(originalRequest)); // Token yenilendikten sonra istek tekrar gönderilir
        });
      });
    }

    return Promise.reject(error); // Diğer hataları aynen döndür
  }
);

export default api;
