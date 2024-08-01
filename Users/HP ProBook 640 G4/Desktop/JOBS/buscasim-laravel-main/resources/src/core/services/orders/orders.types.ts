import { BaseQuery, PaginatedResponse } from '@/core/types';
import { Coupon } from '../coupons';
import { User } from '../users';
import { SearchResult } from '../search';

export interface Order {
  id: number;
  total: number;
  status: OrderStatusType;
  plate: string;
  data: SearchResult | null;
  user: User;
  coupon: Coupon | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export type OrderStatusType = 'pending' | 'confirmed' | 'cancelled';

export type OrderListQuery = BaseQuery & {
  date?: Date | string | null;
  status?: OrderStatusType | null;
};

export type OrderListResponse = PaginatedResponse<Order>;
export interface ProcessPaymentRequest {
  name: string;
  email: string;
  document: string;
  accept_terms: boolean;
  plate: string;
  coupon_id: number | null;
}

export interface ProcessPaymentResponse {
  payment_id: number;
  customer: {
    id: number;
    name: string;
    email: string;
  };
  qrcode: string;
  code: string;
}

export interface PaymentConfirmed {
  payment: {
    payment_id: number;
    data: SearchResult;
    confirmed: boolean;
  };
}
