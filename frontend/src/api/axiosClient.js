import axios from "axios";
import { parse, stringify } from "qs";
import { getAccessToken, getRefreshToken, setToken } from "@utils/localstorage";
import { decodedJwt } from "@utils/jwt";
import { store } from "@app/store";
import { logout } from "@app/slices/authSlice";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api/v1`,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      try {
        const refreshToken = getRefreshToken();
        const decodedToken = decodedJwt(refreshToken);

        if (!decodedToken || decodedToken.exp * 1000 < Date.now()) {
          store.dispatch(logout());
        }

        const { data } = await axiosClient.post(`/auth/refresh-token`, {
          refreshToken: refreshToken,
        });
        setToken(data);
        axiosClient.defaults.headers.common["Authorization"] =
          "Bearer " + data.accessToken;
        return axiosClient(originalRequest);
      } catch (e) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
