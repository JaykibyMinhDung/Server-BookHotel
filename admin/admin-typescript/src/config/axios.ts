import axios, { AxiosRequestConfig } from "axios";

export const instanceAxios = axios.create({
  baseURL: "http://localhost:5000/",
  timeout: 60000,
});

instanceAxios.interceptors.request.use((config) => {
  //   const access_Token = document.cookie;
  const access_Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRvYW5taW5oZHVuZzEyM0BnbWFpbC5jb20iLCJ1c2VySWQiOiI2NGExOTE4MjcyNWQ5NDhlY2E4OWJhZmQiLCJpYXQiOjE3MDQ4MTY3NzEsImV4cCI6MTcwNTQyMTU3MX0.PCy97_6WqVW6Wd-yYIc1MIn0ukMwTT0pDish5KHXDsg";
  if (access_Token) {
    config.headers["Authorization"] = `Bearer ${access_Token}`;
  }
  return config;
});

instanceAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      window.location.assign("/auth/login");
    }
    return Promise.reject(error);
  }
);
