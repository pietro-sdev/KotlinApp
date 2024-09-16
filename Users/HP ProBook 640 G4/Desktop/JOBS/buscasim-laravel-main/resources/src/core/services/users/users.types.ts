import { BaseQuery, PaginatedResponse } from '@/core/types';

export interface User {
  id: number;
  name: string;
  email: string;
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
}

export type UserRolesType = 'admin' | 'user';

export type UserListQuery = BaseQuery & {
  name?: string;
  email?: string;
  role?: UserRolesType | null;
};

export type UserListResponse = PaginatedResponse<User>;
