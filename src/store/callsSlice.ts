import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICall } from '../interfaces/interfaces';


interface ICallsState {
  calls: ICall[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ICallsState = {
  calls: [],
  isLoading: false,
  error: null,
};

const callsSlice = createSlice({
  name: 'calls',
  initialState,
  reducers: {
    fetchCallsStart(state, action: PayloadAction<{ dateStart: string; dateEnd: string }>) {
      state.isLoading = true;
      state.error = null;
      console.log(`Даты: с ${action.payload.dateStart} по ${action.payload.dateEnd}`);
    },
    fetchCallsSuccess(state, action: PayloadAction<ICall[]>) {
      state.isLoading = false;
      state.calls = action.payload;
    },
    fetchCallsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCallsStart, fetchCallsSuccess, fetchCallsFailure } = callsSlice.actions;

export default callsSlice.reducer;