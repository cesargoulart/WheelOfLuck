import { configureStore } from '@reduxjs/toolkit';
import wheelReducer from './wheelSlice';

const store = configureStore({
  reducer: {
    wheel: wheelReducer,
  },
});

export default store;
