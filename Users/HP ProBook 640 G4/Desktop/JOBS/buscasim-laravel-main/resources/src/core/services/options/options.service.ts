import api from '@/core/config/axios';
import { ApiResponse } from '@/core/types';
import { Option, OptionsRequest } from '.';

export default {
  async list(): Promise<Option[]> {
    return api.get(`/api/options`);
  },

  async getOption(key?: string): Promise<any | false> {
    return api.get(`/api/options/${key?.toUpperCase()}`);
  },

  async update(data: OptionsRequest): Promise<ApiResponse> {
    return api.patch(`/api/options`, data);
  },
};
