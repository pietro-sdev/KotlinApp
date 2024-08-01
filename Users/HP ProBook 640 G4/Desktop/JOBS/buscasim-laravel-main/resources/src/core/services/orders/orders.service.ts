import api from '@/core/config/axios';
import {
  Order,
  OrderListQuery,
  OrderListResponse,
  ProcessPaymentRequest,
  ProcessPaymentResponse,
} from '.';

export default {
  async process(data: ProcessPaymentRequest): Promise<ProcessPaymentResponse> {
    return api.post(`/api/orders/process`, data);
  },

  async list(params?: OrderListQuery): Promise<OrderListResponse> {
    return api.get(`/api/orders`, { params });
  },

  async detail(id?: number): Promise<Order> {
    return api.get(`/api/orders/${id}`);
  },
};
