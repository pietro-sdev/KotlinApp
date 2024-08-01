import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Group, Checkbox, Text } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { modals } from '@mantine/modals';

import { Table } from '@/components/__commons';
import { User, UserListResponse, useRemoveUser } from '@/core/services/users';

interface Props {
  data?: UserListResponse;
  loading?: boolean;
  onSelect: (obj: User) => void;
  onPaginate?: (page: number) => void;
}

export function UsersList({ data, loading, onSelect, onPaginate }: Props) {
  const removeMutation = useRemoveUser();

  const confirmRemove = (obj: User) =>
    modals.openConfirmModal({
      title: 'Remover Usuário',
      children: <Text size="sm">Deseja realmente remover esse usuário?</Text>,
      labels: { confirm: 'Remover', cancel: 'Cancelar' },
      confirmProps: { loading: removeMutation.isLoading },
      centered: true,
      onConfirm: async () => await removeMutation.mutateAsync(obj),
    });

  const columnHelper = createColumnHelper<User>();

  const columns = [
    columnHelper.accessor('id', {
      id: 'id',
      header: 'ID',
      cell: ({ getValue }) => <Text align="center">{getValue()}</Text>,
      meta: { style: { minWidth: '50px', textAlign: 'center' } },
    }),
    columnHelper.accessor('name', {
      id: 'name',
      header: 'Nome',
      cell: ({ getValue }) => <Text align="left">{getValue()}</Text>,
      meta: { style: { minWidth: '150px', textAlign: 'left' } },
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: 'E-mail',
      cell: ({ getValue }) => <Text align="left">{getValue()}</Text>,
      meta: { style: { minWidth: '200px', textAlign: 'left' } },
    }),
    columnHelper.accessor((row) => row.permissions?.orders, {
      id: 'orders',
      header: 'Pedidos',
      cell: ({ getValue }) => (
        <Checkbox checked={getValue() || false} readOnly style={{ textAlign: 'center' }} />
      ),
      meta: { style: { minWidth: '100px', textAlign: 'center' } },
    }),
    columnHelper.accessor((row) => row.permissions?.coupons, {
      id: 'coupons',
      header: 'Cupons',
      cell: ({ getValue }) => (
        <Checkbox checked={getValue() || false} readOnly style={{ textAlign: 'center' }} />
      ),
      meta: { style: { minWidth: '100px', textAlign: 'center' } },
    }),
    columnHelper.accessor((row) => row.permissions?.contacts, {
      id: 'contacts',
      header: 'Contatos',
      cell: ({ getValue }) => (
        <Checkbox checked={getValue() || false} readOnly style={{ textAlign: 'center' }} />
      ),
      meta: { style: { minWidth: '100px', textAlign: 'center' } },
    }),
    columnHelper.accessor((row) => row.permissions?.pages, {
      id: 'pages',
      header: 'Páginas',
      cell: ({ getValue }) => (
        <Checkbox checked={getValue() || false} readOnly style={{ textAlign: 'center' }} />
      ),
      meta: { style: { minWidth: '100px', textAlign: 'center' } },
    }),
    columnHelper.accessor((row) => row.permissions?.users, {
      id: 'users',
      header: 'Usuários',
      cell: ({ getValue }) => (
        <Checkbox checked={getValue() || false} readOnly style={{ textAlign: 'center' }} />
      ),
      meta: { style: { minWidth: '100px', textAlign: 'center' } },
    }),
    columnHelper.accessor((row) => row.permissions?.settings, {
      id: 'settings',
      header: 'Configurações',
      cell: ({ getValue }) => (
        <Checkbox checked={getValue() || false} readOnly style={{ textAlign: 'center' }} />
      ),
      meta: { style: { minWidth: '150px', textAlign: 'center' } },
    }),
    columnHelper.accessor((row) => row.permissions?.visible_fields, {
      id: 'visible_fields',
      header: 'Campos Vísiveis',
      cell: ({ getValue }) => (
        <Checkbox checked={getValue() || false} readOnly style={{ textAlign: 'center' }} />
      ),
      meta: { style: { minWidth: '150px', textAlign: 'center' } },
    }),
    columnHelper.accessor((row) => row, {
      id: 'actions',
      header: '',
      cell: ({ getValue }) => (
        <Group justify="flex-end" gap="sm" align="center">
          <ActionIcon
            variant="transparent"
            size="lg"
            onClick={() => onSelect(getValue())}
          >
            <IconEdit />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            size="lg"
            onClick={() => confirmRemove(getValue())}
          >
            <IconTrash />
          </ActionIcon>
        </Group>
      ),
    }),
  ];

  return (
    <Table<User>
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
