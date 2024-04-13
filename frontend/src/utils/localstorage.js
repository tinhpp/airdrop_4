export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const setToken = (payload) => {
  localStorage.setItem('accessToken', payload.accessToken);
  localStorage.setItem('refreshToken', payload.refreshToken);
};

export const clearToken = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};
