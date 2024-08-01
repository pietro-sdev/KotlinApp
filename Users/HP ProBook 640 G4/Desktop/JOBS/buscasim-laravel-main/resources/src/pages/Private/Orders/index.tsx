import { useState } from 'react';
import { Breadcrumbs, Group, Paper, Stack, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';

import { AnchorLink } from '@/components/__commons';
import { OrdersFilters, OrdersList } from '@/components/Orders';
import { OrderListQuery, useOrders } from '@/core/services/orders';
import dayjs from 'dayjs';

export default function OrdersPage() {
  const [params, setParams] = useState<OrderListQuery>();
  const [debounced] = useDebouncedValue(
    {
      ...params,
      date: params?.date ? dayjs(params.date).format('YYYY-MM-DD') : null,
    },
    200
  );
  const { data, isLoading } = useOrders(debounced);

  return (
    <Stack>
      <Group justify="space-between">
        <Breadcrumbs>
          <AnchorLink href="/app">Dashboard</AnchorLink>
          <Text fw="bolder">Pedidos</Text>
        </Breadcrumbs>
        <OrdersFilters onChange={setParams} />
      </Group>

      <Paper p="md" withBorder>
        <Stack>
          <OrdersList
            data={data}
            loading={isLoading}
            onPaginate={(page) => setParams((params) => ({ ...params, page }))}
          />
        </Stack>
      </Paper>
    </Stack>
  );
}
