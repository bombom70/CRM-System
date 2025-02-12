import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  Meta,
  MetaResponse,
  User,
  UserFilters,
  UserRequest,
} from '../../api/users/types';
import { fetchGetProfileUser, fetchUsers } from '../../api/users/users';
import { httpClient } from '../../api/httpClient';
import axios from 'axios';
import { PAGE_SIZE } from '../../shared/constants';
import { StatusLoading } from '../../shared/types';

export interface AuthState {
  users: User[];
  meta: Meta;
  userProfile: User | null;
  filters: UserFilters;
  loading: StatusLoading;
  error: string | null;
}

const initialState: AuthState = {
  users: [],
  meta: {
    totalAmount: 0,
    sortBy: 'id',
    sortOrder: 'asc',
  },
  userProfile: null,
  filters: {
    limit: PAGE_SIZE,
    offset: 0,
  },
  loading: StatusLoading.IDLE,
  error: null,
};

export const getUsersData = createAsyncThunk<MetaResponse<User>, UserFilters>(
  'users/fetchUsers',
  async (params, { rejectWithValue }) => {
    try {
      const data = await fetchUsers(params);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProfileUser = createAsyncThunk<User, string>(
  'users/fetchProfileUser',
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchGetProfileUser(id);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProfileUser = createAsyncThunk<
  User,
  UserRequest & { id: string },
  { rejectValue: { message: string } }
>('users/fetchUpdateProfileUser', async (userData, { rejectWithValue }) => {
  try {
    const { id, ...data } = userData;
    const res = await httpClient.put(`/admin/users/${id}`, data);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        ...error,
        message: 'Пользователь с таким email уже существует',
      });
    }
    return rejectWithValue(new Error((error as Error).message));
  }
});

export const deleteUser = createAsyncThunk<void, number>(
  'users/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await httpClient.delete(`/admin/users/${id}`);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFitlers(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersData.pending, (state) => {
        state.loading = StatusLoading.PENDING;
        state.error = null;
      })
      .addCase(getUsersData.fulfilled, (state, action) => {
        state.loading = StatusLoading.FULFILLED;
        state.users = (action.payload.data ?? []).map((u) => ({
          ...u,
          key: u.id,
        }));
        state.meta = action.payload.meta;
        state.error = null;
      })
      .addCase(getUsersData.rejected, (state, action) => {
        state.loading = StatusLoading.REJECTED;
        state.users = [];
        state.error = action.error.message as string;
      })
      .addCase(getProfileUser.pending, (state) => {
        state.loading = StatusLoading.PENDING;
        state.error = null;
      })
      .addCase(getProfileUser.fulfilled, (state, action) => {
        state.loading = StatusLoading.FULFILLED;
        state.userProfile = action.payload;
        state.error = null;
      })
      .addCase(getProfileUser.rejected, (state, action) => {
        state.loading = StatusLoading.REJECTED;
        state.userProfile = null;
        state.error = action.error.message as string;
      })
      .addCase(updateProfileUser.pending, (state) => {
        state.loading = StatusLoading.PENDING;
        state.error = null;
      })
      .addCase(updateProfileUser.fulfilled, (state, action) => {
        state.loading = StatusLoading.FULFILLED;
        state.userProfile = action.payload;
        state.error = null;
      })
      .addCase(updateProfileUser.rejected, (state, action) => {
        state.loading = StatusLoading.REJECTED;
        state.error = action.payload?.message as string;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = StatusLoading.PENDING;
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = StatusLoading.REJECTED;
        state.error = action.error.message as string;
      });
  },
});

export const { setFitlers } = usersSlice.actions;

export default usersSlice.reducer;
