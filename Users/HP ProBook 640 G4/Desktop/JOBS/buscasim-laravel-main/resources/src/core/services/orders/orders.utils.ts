import { getOptionsFromObject } from '@/core/utils';
import { OrderStatusType } from '.';

const orderStatus: Record<OrderStatusType, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  cancelled: 'Cancelado',
};

export const orderStatusOptions = getOptionsFromObject(orderStatus);

export const getOrderStatus = (status: OrderStatusType) => orderStatus[status];
