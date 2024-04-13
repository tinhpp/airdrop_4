import { createSlice } from '@reduxjs/toolkit';
import { clearToken } from '@utils/localstorage';

const initialState = {
  isAuth: false,
  user: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      (state.isAuth = true), (state.user = action.payload);
    },
    logout: (state, action) => {
      clearToken();
      state.isAuth = false;
      state.user = {};
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
