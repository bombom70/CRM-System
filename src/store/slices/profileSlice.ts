import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Profile, Roles } from '../../api/profile/types';
import { fetchProfile } from '../../api/profile/profile';
import { StatusLoading } from '../../shared/types';

export interface AuthState {
  profileData: Profile | null;
  isAuth: boolean;
  loading: StatusLoading;
  error: string | null;
}

export const getProfileData = createAsyncThunk<Profile, undefined>(
  'profile/fetchProfile',
  fetchProfile
);

const initialState: AuthState = {
  profileData: null,
  isAuth: false,
  loading: StatusLoading.IDLE,
  error: null,
};

export const profileSlice = createSlice({
  name: 'profile',
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
        localStorage.setItem('isAdmin', String(false));
      })
      .addCase(getProfileData.fulfilled, (state, action) => {
        state.loading = StatusLoading.FULFILLED;
        state.profileData = action.payload;
        const isAdmin = action.payload.roles?.includes(Roles.ADMIN);
        localStorage.setItem('isAdmin', String(isAdmin));
        state.error = null;
      })
      .addCase(getProfileData.rejected, (state, action) => {
        state.loading = StatusLoading.REJECTED;
        state.profileData = null;
        state.error = action.error.message as string;
        localStorage.setItem('isAdmin', String(false));
      });
  },
});

export const { changeAuth } = profileSlice.actions;

export default profileSlice.reducer;
