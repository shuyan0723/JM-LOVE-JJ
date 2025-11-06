import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from './userSlice';

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('jj_token') || null,
  user: localStorage.getItem('jj_user') ? JSON.parse(localStorage.getItem('jj_user') || '{}') : null,
  isAuthenticated: !!localStorage.getItem('jj_token'),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 登录开始
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    // 登录成功
    loginSuccess: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
      // 持久化到localStorage
      localStorage.setItem('jj_token', action.payload.token);
      localStorage.setItem('jj_user', JSON.stringify(action.payload.user));
    },
    // 登录失败
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    // 注册成功
    registerSuccess: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('jj_token', action.payload.token);
      localStorage.setItem('jj_user', JSON.stringify(action.payload.user));
    },
    // 刷新token
    refreshToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('jj_token', action.payload);
    },
    // 登出
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('jj_token');
      localStorage.removeItem('jj_user');
    },
    // 清除错误
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerSuccess,
  refreshToken,
  logout,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
