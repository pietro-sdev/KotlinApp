import api from '@/core/config/axios';
import { ApiResponse } from '@/core/types';
import {
  CouponListQuery,
  CouponListResponse,
  CouponRequest,
  CouponDiscountResponse,
} from '.';

export default {
  async list(query?: CouponListQuery): Promise<CouponListResponse> {
    return api.get('/api/coupons', { params: { ...query } });
  },

  async create(data: CouponRequest): Promise<ApiResponse> {
    return api.post('/api/coupons', data);
  },

  async update(data: CouponRequest): Promise<ApiResponse> {
    return api.put(`/api/coupons/${data.id}`, data);
  },

  async remove(data: CouponRequest): Promise<ApiResponse> {
    return api.delete(`/api/coupons/${data.id}`);
  },

  async discount(code?: string): Promise<CouponDiscountResponse> {
    return api.get(`/api/coupons/search/${code}`);
  },
};
