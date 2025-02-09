import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Profile } from '../../shared/types';
import { fetchProfile } from '../../api/user';
import { TokenStore } from '../../shared/TokenStore';

export enum StatusLoading {
  ITL = 'ITL',
  PENDING = 'PENDING',
  FULFILLED = 'FULFILLED',
  REJECTED = 'REJECTED',
}

export interface AuthState {
  profileData: Profile | null;
  isAuth: boolean;
  loading: StatusLoading;
  error: string | null;
}

export const getProfileData = createAsyncThunk<Profile, undefined>(
  'user/profile',
  fetchProfile
);

const tokenStore = new TokenStore();

const initialState: AuthState = {
  profileData: null,
  isAuth: tokenStore.getRefresh()?.length ? true : false,
  loading: StatusLoading.ITL,
  error: null,
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeAuth(state, { payload }) {
      state.isAuth = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileData.pending, (state) => {
        state.loading = StatusLoading.PENDING;
        state.error = null;
      })
      .addCase(getProfileData.fulfilled, (state, action) => {
        state.loading = StatusLoading.FULFILLED;
        state.profileData = action.payload;
        state.error = null;
      })
      .addCase(getProfileData.rejected, (state, action) => {
        state.loading = StatusLoading.REJECTED;
        state.error = action.error as string;
      });
  },
});

export const { changeAuth } = userReducer.actions;

export default userReducer.reducer;
