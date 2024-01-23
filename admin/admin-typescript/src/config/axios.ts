import axios, { AxiosRequestConfig } from "axios";

export const instanceAxios = axios.create({
  baseURL: "http://localhost:5000/",
  timeout: 60000,
});

type Access_Token = {
  token: string;
};

instanceAxios.interceptors.request.use(
  async (config) => {
    const access_Token: string | null = localStorage.getItem("access_user");
    if (access_Token) {
      const key_access: Access_Token = await JSON.parse(access_Token);
      config.headers["Authorization"] = `Bearer ${key_access.token}`;
    }
    return config;
  },
  (error) => {
    if (error.response?.status === 401) {
      alert("Tài khoản đã hết phiên đăng nhập");
      window.location.assign("/login");
    }
    return Promise.reject(error);
  }
);

instanceAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      alert("Tài khoản đã hết phiên đăng nhập");
      window.location.assign("/login");
    }
    return Promise.reject(error);
  }
);
