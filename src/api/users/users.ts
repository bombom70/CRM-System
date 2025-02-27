import { httpClient } from '../httpClient';
import { MetaResponse, User, UserFilters, UserRolesRequest } from './types';

export const fetchUsers = async (
  params?: UserFilters
): Promise<MetaResponse<User>> => {
  try {
    const res = await httpClient('/admin/users', {
      params,
    });
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchGetProfileUser = async (id: string): Promise<User> => {
  try {
    const res = await httpClient(`/admin/users/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUpdateProfileUser = async (
  userData: Record<string, string>
): Promise<User> => {
  try {
    const { id, ...data } = userData;
    const res = await httpClient.put(`/admin/users/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchBlockUser = async (id: number): Promise<User> => {
  try {
    const { data } = await httpClient.post(`/admin/users/${id}/block`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchUnblockUser = async (id: number): Promise<User> => {
  try {
    const { data } = await httpClient.post(`/admin/users/${id}/unblock`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchUpdateRolesUser = async (
  { roles }: UserRolesRequest,
  id: number
): Promise<User> => {
  try {
    const res = await httpClient.post(`/admin/users/${id}/rights`, { roles });
    return res.data;
  } catch (error) {
    throw error;
  }
};
