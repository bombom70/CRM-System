import { Roles } from '../profile/types';

export interface UserFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  isBlocked?: boolean;
  limit?: number; // сколько на странице
  offset?: number; // страницу
}

export interface User {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: Roles[];
  phoneNumber: string;
  key: number;
}
export interface Meta {
  totalAmount: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface MetaResponse<T> {
  data: T[];
  meta: Meta;
}

export interface UserRequest {
  username?: string;
  email?: string;
  phoneNumber?: string;
}
export interface UserRolesRequest {
  roles: Roles[];
}
