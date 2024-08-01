import { BaseQuery, PaginatedResponse } from '@/core/types';

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CreateContactRequest {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export type ContactListQuery = BaseQuery & {
  name?: string;
  email?: string;
  subject?: string;
};

export type ContactListResponse = PaginatedResponse<Contact>;
