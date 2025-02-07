import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Profile } from '../../shared/types';
import { httpClient } from '../../api/httpClient';

export enum StatusLoading {
  ITL = 'ITL',
  PENDING = 'PENDING',
  FULFILLED = 'FULFILLED',
  REJECTED = 'REJECTED',
}

export interface AuthState {
  profileData: Profile | null;
  loading: StatusLoading;
  error: string | null;
}

export const fetchProfile = createAsyncThunk<Profile, undefined>(
  'users/profile',
  async () => {
    try {
      const { data } = await httpClient('/user/profile');
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState: AuthState = {
  profileData: null,
  loading: StatusLoading.ITL,
  error: null,
};

export const authReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = StatusLoading.PENDING;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = StatusLoading.FULFILLED;
        state.profileData = action.payload;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = StatusLoading.REJECTED;
        state.error = action.error as string;
      });
  },
});

export default authReducer.reducer;
