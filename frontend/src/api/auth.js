import axiosClient from './axiosClient';

const authApi = {
  login: (payload) => {
    const url = '/users/login';
    return axiosClient.post(url, payload);
  },
  register: (payload) => {
    const url = '/users/register';
    return axiosClient.post(url, payload);
  },
};

export default authApi;
