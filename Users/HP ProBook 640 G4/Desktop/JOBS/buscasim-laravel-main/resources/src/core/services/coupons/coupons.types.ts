import { BaseQuery, PaginatedResponse } from '@/core/types';

export interface Coupon {
  id: number;
  code: string;
  type: CouponType;
  amount: number;
  expiration: Date | string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export type CouponType = 'percentage' | 'fixed';
export interface CouponRequest {
  id?: number;
  code: string;
  type: CouponType;
  amount: number;
  expiration: Date | string | null;
}

export type CouponListQuery = BaseQuery & {
  code?: string;
  type?: CouponType | null;
};

export type CouponListResponse = PaginatedResponse<Coupon>;

export interface CouponDiscountResponse {
  coupon_id: number | null;
  discount: number;
  subtotal: number;
}
