import { createSlice } from '@reduxjs/toolkit';

export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export interface SongsState {
  songs: Song[];
}

const initialState: SongsState = {
  songs: [],
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setSongs: (state = initialState, action) => {
      state.songs = action.payload;
    },
    addSong: (state, action) => {
      state.songs.unshift(action.payload);
    },
    updateSong: (state, action) => {
      state.songs = state.songs.map((song) =>
        song._id === action.payload._id ? action.payload : song
      );
    },
    deleteSong: (state, action) => {
      state.songs = state.songs.filter((song) => song._id !== action.payload);
    },
  },
});

export const { setSongs, addSong, updateSong, deleteSong } = songsSlice.actions;

export default songsSlice.reducer;
