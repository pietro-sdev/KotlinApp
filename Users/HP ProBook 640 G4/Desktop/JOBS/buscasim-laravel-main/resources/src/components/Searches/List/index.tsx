import { createColumnHelper } from '@tanstack/react-table';
import { Order, OrderListResponse } from '@/core/services/orders';
import { moneyFormat } from '@/core/utils';
import dayjs from 'dayjs';
import { Table } from '@/components/__commons';
import { ActionIcon, Group, Paper } from '@mantine/core';
import { IconEye, IconHeart } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useSearchResults } from '@/core/providers';
import { SearchResult } from '@/core/services/search';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

interface Props {
  data?: OrderListResponse;
  loading?: boolean;
  onPaginate?: (page: number) => void;
  onToggleFavorite: (orderId: number, userId: number, isFavorite: boolean) => void;
}

export function SearchesList({ data, loading, onPaginate, onToggleFavorite }: Props) {
  const navigate = useNavigate();
  const { setSearchResults } = useSearchResults();

  // Initialize favorites state from data
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    if (data?.items) {
      const initialFavorites = Object.fromEntries(data.items.map((order) => [order.id, order.is_favorite]));
      setFavorites(initialFavorites);
    }
  }, [data]);

  const columnHelper = createColumnHelper<Order>();

  const columns = [
    columnHelper.accessor('id', {
      id: 'order_id',
      header: 'N° do pedido',
    }),
    columnHelper.accessor('total', {
      id: 'total',
      header: 'Valor Total',
      cell: ({ getValue }) => moneyFormat(getValue()),
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
    columnHelper.accessor('updated_at', {
      id: 'updated_at',
      header: 'Data do pagamento',
      cell: ({ getValue }) => dayjs(getValue()).format('DD/MM/YYYY'),
    }),
    columnHelper.accessor((row) => row, {
      id: 'actions',
      header: '',
      cell: ({ getValue }) => {
        const order = getValue();
        const isFavorite = favorites[order.id];
        return (
          <Group justify="flex-end" gap="xs" align="center">
            <ActionIcon
              variant="transparent"
              size="lg"
              onClick={() => handleViewResults(order)}
            >
              <IconEye />
            </ActionIcon>
            <ActionIcon
              onClick={() => handleToggleFavorite(order.id, order.user_id, isFavorite)}
              color={isFavorite ? 'red' : 'gray'}
            >
              <IconHeart />
            </ActionIcon>
          </Group>
        );
      },
    }),
  ];

  console.log(data);

  function handleViewResults(order: Order) {
    setSearchResults({
      results: JSON.parse(order.data as unknown as string) as SearchResult,
      premium: true,
    });
    navigate('/resultados');
  }

  const handleToggleFavorite = async (orderId: number, userId: number, isFavorite: boolean) => {
    try {
      if (isFavorite) {
        await axios.delete(`/api/orders/${orderId}/favorite`, { data: { user_id: userId } });
        toast.success('Pedido removido dos favoritos');
      } else {
        await axios.post(`/api/orders/${orderId}/favorite`, { user_id: userId });
        toast.success('Pedido adicionado aos favoritos.');
      }
      setFavorites((prevFavorites) => ({
        ...prevFavorites,
        [orderId]: !isFavorite,
      }));
    } catch (error) {
      toast.error('Error toggling favorite');
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <Paper withBorder p="md" w="100%">
      <Table<Order>
        columns={columns}
        data={data?.items || []}
        loading={loading}
        pagination={{
          total: data?.pagination.last_page || 1,
          onPaginate: (page) => onPaginate && onPaginate(page),
        }}
      />
    </Paper>
  );
}
