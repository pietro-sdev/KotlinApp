import api from '@/core/config/axios';
import { SearchRequest, SearchResult, SearchInformation } from '.';

export default {
  async search(data: SearchRequest): Promise<SearchResult> {
    return api.post(`/api/search`, data);
  },

  async info(): Promise<SearchInformation> {
    return api.get(`/api/search/info`);
  },
};

