import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statistics: {},
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    setstatistics: (state = initialState, action) => {
      state.statistics = action.payload;
    },
  },
});

export const { setstatistics } = statisticsSlice.actions;

export default statisticsSlice.reducer;
