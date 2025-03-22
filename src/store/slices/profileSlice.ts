import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Profile, Roles } from '../../api/profile/types';
import { fetchProfile } from '../../api/profile/profile';
import { StatusLoading } from '../../shared/types';

export interface AuthState {
  profileData: Profile | null;
  isAuth: boolean;
  isAdmin: boolean;
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
  isAdmin: false,
  loading: StatusLoading.IDLE,
  error: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  selectors: {
    isAdmin(state) {
      return state.profileData?.roles.includes(Roles.ADMIN);
    },
  },
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
        state.isAdmin = state.profileData?.roles.includes(Roles.ADMIN) ?? false;
      })
      .addCase(getProfileData.rejected, (state, action) => {
        state.loading = StatusLoading.REJECTED;
        state.profileData = null;
        state.error = action.error.message as string;
      });
  },
});

export const { changeAuth } = profileSlice.actions;
export const { isAdmin } = profileSlice.selectors;

export default profileSlice.reducer;
