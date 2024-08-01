import { getOptionsFromObject } from '@/core/utils';
import { CouponType } from '.';

const couponType: Record<CouponType, string> = {
  fixed: 'Desconto Fixo',
  percentage: 'Porcentagem',
};

export const couponTypeOptions = getOptionsFromObject(couponType);

export const getCouponType = (type: CouponType) => couponType[type];
