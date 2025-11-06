import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Song {
  id: number;
  name: string;
  artist: string;
  album: string;
  duration: string;
  plays: string;
  liked?: boolean;
}

export interface Album {
  id: number;
  name: string;
  year: number;
  songs: number;
}

interface MusicState {
  songs: Song[];
  albums: Album[];
  favorites: number[];
  currentPlayingSong: Song | null;
  isPlaying: boolean;
  searchTerm: string;
  selectedAlbum: string;
}

const initialState: MusicState = {
  songs: [
    { id: 1, name: '一个人在雨中哭泣', artist: '林俊杰', album: '第二天堂', duration: '4:32', plays: '2.5M' },
    { id: 2, name: '不为谁而唱歌', artist: '林俊杰', album: '第二天堂', duration: '4:45', plays: '3.2M' },
    { id: 3, name: '天下没有不散的筵席', artist: '林俊杰', album: '浪漫血质', duration: '4:28', plays: '2.8M' },
    { id: 4, name: '曹操', artist: '林俊杰', album: '曹操', duration: '4:22', plays: '5.1M' },
    { id: 5, name: '她说', artist: '林俊杰', album: '编年史', duration: '4:33', plays: '4.9M' },
    { id: 6, name: '江南', artist: '林俊杰', album: '编年史', duration: '3:58', plays: '3.5M' },
    { id: 7, name: '醉赤壁', artist: '林俊杰', album: '曹操', duration: '5:07', plays: '4.2M' },
    { id: 8, name: '参加你的婚礼', artist: '林俊杰', album: '第二天堂', duration: '4:15', plays: '2.2M' },
  ],
  albums: [
    { id: 1, name: '第二天堂', year: 2004, songs: 12 },
    { id: 2, name: '浪漫血质', year: 2005, songs: 11 },
    { id: 3, name: '编年史', year: 2006, songs: 12 },
    { id: 4, name: '曹操', year: 2010, songs: 12 },
  ],
  favorites: [],
  currentPlayingSong: null,
  isPlaying: false,
  searchTerm: '',
  selectedAlbum: 'all',
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedAlbum: (state, action: PayloadAction<string>) => {
      state.selectedAlbum = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const index = state.favorites.indexOf(action.payload);
      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(action.payload);
      }
    },
    playMusic: (state, action: PayloadAction<Song>) => {
      state.currentPlayingSong = action.payload;
      state.isPlaying = true;
    },
    pauseMusic: (state) => {
      state.isPlaying = false;
    },
    resumeMusic: (state) => {
      state.isPlaying = true;
    },
  },
});

export const {
  setSearchTerm,
  setSelectedAlbum,
  toggleFavorite,
  playMusic,
  pauseMusic,
  resumeMusic,
} = musicSlice.actions;

export default musicSlice.reducer;
