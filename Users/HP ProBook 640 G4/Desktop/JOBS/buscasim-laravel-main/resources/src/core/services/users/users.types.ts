import { BaseQuery, PaginatedResponse } from '@/core/types';

export interface User {
  id: number;
  name: string;
  email: string;
  orders: boolean;
  coupons: boolean;
  settings: boolean;
  pages: boolean;
  visible_fields: boolean;
  contacts: boolean;
  users: boolean;
  role: UserRolesType;
  document: string | null;
  accept_terms: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface UserRequest {
  id?: number;
  name: string;
  email: string;
  orders: boolean;
  coupons: boolean;
  settings: boolean;
  pages: boolean;
  visible_fields: boolean;
  contacts: boolean;
  users: boolean;
}

export type UserRolesType = 'admin' | 'user';

export type UserListQuery = BaseQuery & {
  name?: string;
  email?: string;
  role?: UserRolesType | null;
};

export type UserListResponse = PaginatedResponse<User>;
