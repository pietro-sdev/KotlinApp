import { useState } from 'react';
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
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { UsersFilters, UsersList } from '@/components/Users';
import { User, UserListQuery, useUsers } from '@/core/services/users';
import { AnchorLink } from '@/components/__commons';
import { UserModal } from '@/components/Users/Modal';

export default function UsersPage() {
  const [params, setParams] = useState<UserListQuery>();
  const [debounced] = useDebouncedValue(params, 200);
  const [selected, setSelected] = useState<User>();
  const [opened, { open, close }] = useDisclosure(false);
  const { data, isLoading } = useUsers(debounced);

  return (
    <Stack>
      <Group justify="space-between">
        <Breadcrumbs>
          <AnchorLink href="/app">Dashboard</AnchorLink>
          <Text fw="bolder">Usuários</Text>
        </Breadcrumbs>
        <UsersFilters onChange={setParams} />
      </Group>

      <Paper p="md" withBorder>
        <Stack>
          <Flex justify="flex-end" align="center">
            <Button onClick={() => open()}>Novo Usuário</Button>
          </Flex>

          <UsersList
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
        <UserModal
          user={selected}
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
