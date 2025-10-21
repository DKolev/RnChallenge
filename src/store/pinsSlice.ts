import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PinsState, AsyncStatus } from '../types/store';
import { storage } from '../storage/mmkv';
import { STORAGE_KEYS } from '../constants/storage';

// fetch pins from API
export const fetchPins = createAsyncThunk('pins/fetchPins', async () => {
  const response = await fetch('http://localhost:3000/pins');
  const data = await response.json();

  // cache the pins data to local storage
  storage.set(STORAGE_KEYS.CACHED_PINS, JSON.stringify(data));

  return data;
});

const initialState: PinsState = {
  pins: [],
  status: AsyncStatus.Idle,
  error: null,
};

const pinsSlice = createSlice({
  name: 'pins',
  initialState,
  reducers: {
    setPins: (state, action) => {
      state.pins = action.payload;
      state.status = AsyncStatus.Succeeded;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPins.pending, state => {
        state.status = AsyncStatus.Loading;
      })
      .addCase(fetchPins.fulfilled, (state, action) => {
        state.status = AsyncStatus.Succeeded;
        state.pins = action.payload;
      })
      .addCase(fetchPins.rejected, (state, action) => {
        state.status = AsyncStatus.Failed;
        state.error = action.error.message || 'Failed to fetch pins';
      });
  },
});

export const { setPins } = pinsSlice.actions;
export default pinsSlice.reducer;
