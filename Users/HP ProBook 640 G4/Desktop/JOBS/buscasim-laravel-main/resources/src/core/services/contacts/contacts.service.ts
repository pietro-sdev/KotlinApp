import api from '@/core/config/axios';
import { ApiResponse } from '@/core/types';
import { ContactListQuery, ContactListResponse, CreateContactRequest } from '.';

export default {
  async list(query?: ContactListQuery): Promise<ContactListResponse> {
    return api.get('/api/contacts', { params: { ...query } });
  },

  async create(data: CreateContactRequest): Promise<ApiResponse> {
    return api.post('/api/contacts', data);
  },

  async remove(id: string): Promise<ApiResponse> {
    return api.delete(`/api/contacts/${id}`);
  },
};
