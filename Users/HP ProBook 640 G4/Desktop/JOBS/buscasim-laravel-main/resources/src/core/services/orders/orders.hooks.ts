import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { getErrorMessage, showError } from '@/core/utils';
import { Order, OrderListQuery, OrderListResponse } from '.';
import { useSearchResults } from '@/core/providers';
import ordersService from './orders.service';

export function useProcessPayment() {
  const { setSearchResults } = useSearchResults();

  return useMutation(ordersService.process, {
    onSuccess(data) {
      setSearchResults({ order: data });
    },
    onError(error) {
      showError(getErrorMessage(error as AxiosError));
    },
  });
}

export function useOrders(query?: OrderListQuery) {
  return useQuery<OrderListResponse, AxiosError>(
    ['orders', { ...query }],
    () => ordersService.list({ ...query }),
    {
      onError(error) {
        showError(getErrorMessage(error as AxiosError));
      },
    }
  );
}

export function useOrder(id?: number) {
  const navigate = useNavigate();

  return useQuery<Order, AxiosError>(
    ['orders.detail', id],
    () => ordersService.detail(id),
    {
      onError(error) {
        const { status } = error as AxiosError;

        if (status === 404) {
          navigate('/minhas-consultas');
        }

        showError(getErrorMessage(error as AxiosError));
      },
    }
  );
}
