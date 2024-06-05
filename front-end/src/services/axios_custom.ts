import axios from "axios";

const axiosCustom = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosCustom.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("refresh_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosCustom.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const currentToken = localStorage.getItem("refresh_token");
        const response = await axios({
          method: "get",
          url:
            process.env.REACT_APP_BASE_URL +
            process.env.REACT_APP_URL_REFRESH_TOKEN,
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        });

        const newToken = response.data.refresh_token;
        localStorage.setItem("refresh_token", newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosCustom;
