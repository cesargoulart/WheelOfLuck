import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  position: 0,
  result: null,
};

const wheelSlice = createSlice({
  name: 'wheel',
  initialState,
  reducers: {
    spinWheel: (state) => {
      // Simple logic to determine the result
      const newPosition = Math.floor(Math.random() * 4);
      state.position = newPosition;
      state.result = newPosition; // Assuming each position corresponds to a result
    },
  },
});

export const { spinWheel } = wheelSlice.actions;
export default wheelSlice.reducer;
