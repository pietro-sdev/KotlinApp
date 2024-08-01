import { createColumnHelper } from '@tanstack/react-table';
import { NumberFormatter } from '@mantine/core';
import dayjs from 'dayjs';

import { Table } from '@/components/__commons';
import {
  Order,
  OrderListResponse,
  getOrderStatus,
} from '@/core/services/orders';

interface Props {
  data?: OrderListResponse;
  loading?: boolean;
  onSelect?: (obj: Order) => void;
  onPaginate?: (page: number) => void;
}

export function OrdersList({ data, loading, onPaginate }: Props) {
  const columnHelper = createColumnHelper<Order>();

  const columns = [
    columnHelper.accessor('id', {
      id: 'order_id',
      header: 'N° do pedido',
    }),
    columnHelper.accessor('user.name', {
      id: 'user.name',
      header: 'Cliente',
    }),
    columnHelper.accessor('total', {
      id: 'total',
      header: 'Valor Total',
      cell: ({ getValue }) => (
        <NumberFormatter
          prefix="R$ "
          value={getValue()}
          decimalScale={2}
          thousandSeparator="."
          decimalSeparator=","
          fixedDecimalScale
        />
      ),
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: 'Status',
      cell: ({ getValue }) => getOrderStatus(getValue()),
    }),
    columnHelper.accessor('plate', {
      id: 'plate',
      header: 'Placa',
    }),
    columnHelper.accessor('coupon', {
      id: 'coupon',
      header: 'Cupom',
      cell: ({ getValue }) => (getValue() ? getValue()?.code : ''),
    }),
    columnHelper.accessor('created_at', {
      id: 'created_at',
      header: 'Data do pedido',
      cell: ({ getValue }) => dayjs(getValue()).format('DD/MM/YYYY'),
    }),
  ];

  return (
    <Table<Order>
      columns={columns}
      data={data?.items || []}
      loading={loading}
      pagination={{
        total: data?.pagination.last_page || 1,
        onPaginate: (page) => onPaginate && onPaginate(page),
      }}
    />
  );
}
