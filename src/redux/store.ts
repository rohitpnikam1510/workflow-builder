import { configureStore } from '@reduxjs/toolkit';
import csvReducer from './csvSlice';
import outputReducer from './outputSlice';

export const store = configureStore({
  reducer: {
        csvData: csvReducer,
        outputData: outputReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Root state type
export type AppDispatch = typeof store.dispatch; // Dispatch type
