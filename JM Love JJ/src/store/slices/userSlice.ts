import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  joinDate: string;
  level: number;
  badges: string[];
}

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  favorites: number[];
  likedPosts: number[];
  userPosts: number;
  achievements: string[];
}

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  favorites: [],
  likedPosts: [],
  userPosts: 0,
  achievements: ['首次登陆', '铁粉', '社区活跃', '演唱会粉丝'],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 登录
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.currentUser = action.payload;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    // 登出
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    // 更新用户资料
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
    // 添加到收藏
    addToFavorites: (state, action: PayloadAction<number>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    // 从收藏中移除
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
    // 点赞帖子
    likePost: (state, action: PayloadAction<number>) => {
      if (!state.likedPosts.includes(action.payload)) {
        state.likedPosts.push(action.payload);
      }
    },
    // 取消点赞
    unlikePost: (state, action: PayloadAction<number>) => {
      state.likedPosts = state.likedPosts.filter(id => id !== action.payload);
    },
    // 增加用户帖子数
    incrementUserPosts: (state) => {
      state.userPosts += 1;
    },
    // 解锁成就
    unlockAchievement: (state, action: PayloadAction<string>) => {
      if (!state.achievements.includes(action.payload)) {
        state.achievements.push(action.payload);
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateProfile,
  addToFavorites,
  removeFromFavorites,
  likePost,
  unlikePost,
  incrementUserPosts,
  unlockAchievement,
} = userSlice.actions;

export default userSlice.reducer;
