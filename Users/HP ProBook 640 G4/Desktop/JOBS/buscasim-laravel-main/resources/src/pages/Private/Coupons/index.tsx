import { useState } from 'react';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import {
  Breadcrumbs,
  Button,
  Flex,
  Group,
  Paper,
  Portal,
  Stack,
  Text,
} from '@mantine/core';

import { AnchorLink } from '@/components/__commons';
import { CouponModal, CouponsFilters, CouponsList } from '@/components/Coupons';
import { Coupon, CouponListQuery, useCoupons } from '@/core/services/coupons';

export default function CouponsPage() {
  const [params, setParams] = useState<CouponListQuery>();
  const [debounced] = useDebouncedValue(params, 200);
  const [selected, setSelected] = useState<Coupon>();
  const [opened, { open, close }] = useDisclosure(false);
  const { data, isLoading } = useCoupons(debounced);

  return (
    <Stack>
      <Group justify="space-between">
        <Breadcrumbs>
          <AnchorLink href="/app">Dashboard</AnchorLink>
          <Text fw="bolder">Cupons</Text>
        </Breadcrumbs>
        <CouponsFilters onChange={setParams} />
      </Group>

      <Paper p="md" withBorder>
        <Stack>
          <Flex justify="flex-end" align="center">
            <Button onClick={() => open()}>Novo Cupon</Button>
          </Flex>

          <CouponsList
            data={data}
            loading={isLoading}
            onPaginate={(page) => setParams((params) => ({ ...params, page }))}
            onSelect={(user) => {
              setSelected(user);
              open();
            }}
          />
        </Stack>
      </Paper>
      <Portal>
        <CouponModal
          coupon={selected}
          opened={opened}
          onClose={() => {
            setSelected(undefined);
            close();
          }}
        />
      </Portal>
    </Stack>
  );
}
