import { Table } from '@/components/__commons';
import {
  Contact,
  ContactListResponse,
  useRemoveContact,
} from '@/core/services/contacts';
import { ActionIcon, Group, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconEye, IconTrash } from '@tabler/icons-react';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';

interface Props {
  data?: ContactListResponse;
  loading?: boolean;
  onSelect: (obj: Contact) => void;
  onPaginate?: (page: number) => void;
}

export function ContactsList({ data, loading, onSelect, onPaginate }: Props) {
  const removeMutation = useRemoveContact();

  const confirmRemove = (obj: Contact) =>
    modals.openConfirmModal({
      title: 'Remover Contato',
      children: <Text size="sm">Deseja realmente remover esse contato?</Text>,
      labels: { confirm: 'Remover', cancel: 'Cancelar' },
      confirmProps: { loading: removeMutation.isLoading },
      centered: true,
      onConfirm: async () => await removeMutation.mutateAsync(`${obj.id}`),
    });

  const columnHelper = createColumnHelper<Contact>();

  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: 'Nome',
    }),
    columnHelper.accessor('phone', {
      id: 'phone',
      header: 'Telefone',
    }),
    columnHelper.accessor('subject', {
      id: 'subject',
      header: 'Assunto',
    }),
    columnHelper.accessor('created_at', {
      id: 'created_at',
      header: 'Data da mensagem',
      cell: ({ getValue }) => dayjs(getValue()).format('DD/MM/YYYY'),
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
            <IconEye />
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
    <Table<Contact>
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
