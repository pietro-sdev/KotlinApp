import api from '@/core/config/axios';
import {
  Page,
  PageRequest,
  PagesListResponse,
  PagesQuery,
} from './pages.types';
import { ApiResponse } from '@/core/types';

export default {
  async list(query?: PagesQuery): Promise<PagesListResponse> {
    return api.get(`/api/pages`, { params: { ...query } });
  },

  async detail(id?: number): Promise<Page> {
    return api.get(`/api/pages/${id}`);
  },

  async update(data: PageRequest): Promise<ApiResponse> {
    return api.put(`/api/pages/${data.id}`, data);
  },

  async create(data: PageRequest): Promise<ApiResponse> {
    return api.post(`/api/pages/create`, data);
  },

  async delete(id?: number): Promise<ApiResponse> {
    return api.delete(`/api/pages/delete/${id}`);
  },

  async getPageBySlug(slug?: string): Promise<Page> {
    if(slug){
      return api.get(`/api/pages/${slug}/content`);
    }
    return api.get(`/api/pages/home/content`);
  },
};
