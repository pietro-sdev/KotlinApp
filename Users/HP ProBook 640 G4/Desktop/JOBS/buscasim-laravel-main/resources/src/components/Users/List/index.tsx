import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Group, Text } from '@mantine/core';
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
    columnHelper.accessor('name', {
      id: 'name',
      header: 'Nome',
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: 'E-mail',
    }),
    columnHelper.accessor('document', {
      id: 'document',
      header: 'CPF',
    }),
    columnHelper.accessor((row) => row, {
      id: 'actions',
      header: '',
      cell: ({ getValue }) => (
        <Group justify="flex-end" gap="xs" align="center">
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
