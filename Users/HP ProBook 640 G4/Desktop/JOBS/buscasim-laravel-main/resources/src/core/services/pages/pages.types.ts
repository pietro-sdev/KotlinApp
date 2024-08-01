import { BaseQuery, PaginatedResponse } from '@/core/types';

export interface Page {
  id: number;
  title: string;
  description: string;
  slug: string;
  content: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PageRequest {
  id?: number;
  title: string;
  description: string;
  slug?: string;
  content: string | null;
  is_published: boolean;
}

export type PagesQuery = BaseQuery & {
  title?: string;
  is_published?: boolean | null;
};

export type PagesListResponse = PaginatedResponse<Page>;
