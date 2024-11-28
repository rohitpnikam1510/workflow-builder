import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CsvState {
  data: Record<string, unknown>[];
}

const initialState: CsvState = {
  data: [],
};

const csvSlice = createSlice({
  name: 'csvData',
  initialState,
  reducers: {
    setCsvData: (state, action: PayloadAction<Record<string, unknown>[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setCsvData } = csvSlice.actions;

export default csvSlice.reducer;