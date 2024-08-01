import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';

import { CouponDiscountResponse, CouponListQuery, CouponListResponse } from '.';
import { queryClient } from '@/core/config/react-query';
import { getErrorMessage, showError, showSuccess } from '@/core/utils';
import couponsService from './coupons.service';

export function useCoupons(query?: CouponListQuery) {
  return useQuery<CouponListResponse, AxiosError>(
    ['coupons', { ...query }],
    () => couponsService.list({ ...query }),
    {
      onError(error) {
        showError(getErrorMessage(error as AxiosError));
      },
    }
  );
}

export function useDiscount(code?: string) {
  return useQuery<CouponDiscountResponse, AxiosError>(
    ['discount', code],
    () => couponsService.discount(code),
    { enabled: !!code }
  );
}

export function useCreateCoupon() {
  return useMutation(couponsService.create, {
    onSuccess(data) {
      queryClient.invalidateQueries(['coupons']);
      showSuccess(data.message);
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}

export function useUpdateCoupon() {
  return useMutation(couponsService.update, {
    onSuccess(data) {
      queryClient.invalidateQueries(['coupons']);
      showSuccess(data.message);
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}

export function useRemoveCoupon() {
  return useMutation(couponsService.remove, {
    onSuccess(data) {
      queryClient.invalidateQueries(['coupons']);
      showSuccess(data.message);
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}
