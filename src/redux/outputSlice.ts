import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OutputState {
  data: Record<string, unknown>[];  // Data type: Array of records
}

const initialState: OutputState = {
  data: [],  // Initial empty array
};

const outputSlice = createSlice({
  name: 'output',
  initialState,
  reducers: {
    // Set output data to the state
    setOutputData: (state, action: PayloadAction<Record<string, unknown>[]>) => {
      state.data = action.payload;  // Mutate the state directly
    },
    // Clear the output data
    clearOutputData: (state) => {
      state.data = [];  // Reset the data to an empty array
    },
  },
});

export const { setOutputData, clearOutputData } = outputSlice.actions;
export default outputSlice.reducer;
