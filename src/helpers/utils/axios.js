import axios from "axios";

const axiosApi = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Request interceptor
axiosApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

// GET
export async function get(url, params = {}, config = {}) {
  return axiosApi.get(url, { params, ...config }).then(res => res.data);
}

// POST (JSON or FormData)
export async function post(url, data, config = {}) {
  const isFormData = data instanceof FormData;
  const headers = isFormData ? { "Content-Type": "multipart/form-data" } : {};
  return axiosApi.post(url, data, { ...config, headers }).then(res => res.data);
}

// PUT (JSON or FormData)
export async function put(url, data, config = {}) {
  const isFormData = data instanceof FormData;
  const headers = isFormData ? { "Content-Type": "multipart/form-data" } : {};
  return axiosApi.put(url, data, { ...config, headers }).then(res => res.data);
}

// DELETE
export async function del(url, params = {}, config = {}) {
  return axiosApi.delete(url, { params, ...config }).then(res => res.data);
}

// Optional: helper for converting object to FormData
export function toFormData(obj) {
  const formData = new FormData();
  Object.keys(obj).forEach(key => {
    if (obj[key] !== undefined && obj[key] !== null) {
      formData.append(key, obj[key]);
    }
  });
  return formData;
}
