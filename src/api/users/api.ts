import {
  MetaResponse,
  User,
  UserFilters,
  UserRequest,
  UserRolesRequest,
} from './types';
import { baseApi } from '../../shared/api';

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<MetaResponse<User>, UserFilters>({
      query: (params) => ({
        url: '/admin/users',
        params,
      }),
      providesTags: ['Users'],
      transformResponse: (res: MetaResponse<User>) => {
        return {
          ...res,
          data: (res.data ?? []).map((u) => ({ ...u, key: u.id })),
        };
      },
    }),
    getUser: build.query<User, string>({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
      }),
      providesTags: ['Users'],
    }),
    updateUser: build.mutation<User, UserRequest & { id: string }>({
      query: (user) => {
        const { id, ...body } = user;
        return {
          method: 'PUT',
          url: `/admin/users/${id}`,
          body,
        };
      },
      invalidatesTags: (_, status) => {
        if (status?.data) return [];
        return ['Users'];
      },
    }),
    changeRole: build.mutation<User, UserRolesRequest & { id: string }>({
      query: (userData) => {
        const { id, roles } = userData;
        return {
          method: 'POST',
          url: `/admin/users/${id}/rights`,
          body: {
            roles,
          },
        };
      },
      invalidatesTags: ['Users'],
    }),
    deleteUser: build.mutation<void, string>({
      query: (userId) => ({
        method: 'DELETE',
        url: `/admin/users/${userId}`,
      }),
      invalidatesTags: ['Users'],
    }),
    changeBlockUser: build.mutation<
      User,
      { userId: string; isBlocked: boolean }
    >({
      query: ({ userId, isBlocked }) => {
        const url = isBlocked ? 'unblock' : 'block';
        return {
          method: 'POST',
          url: `/admin/users/${userId}/${url}`,
        };
      },
      invalidatesTags: ['Users'],
    }),
  }),
});
