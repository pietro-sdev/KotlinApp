import { createColumnHelper } from '@tanstack/react-table';
import { Page, usePages } from '@/core/services/pages';
import { IconEdit , IconTrash  } from '@tabler/icons-react';
import { ActionIcon, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Table } from '@/components/__commons';
import { onDelete } from '@/pages/Private/Pages/Delete';

export function PagesList() {

  const { data, isLoading } = usePages();
  const columnHelper = createColumnHelper<Page>();

  const columns = [
    columnHelper.accessor('title', {
      id: 'title',
      header: 'Título',
    }),
    columnHelper.accessor('description', {
      id: 'description',
      header: 'Descrição',
    }),
    columnHelper.accessor('is_published', {
      id: 'is_published',
      header: 'Publicado',
      cell: ({ getValue }) => (getValue() ? 'Sim' : 'Não'),
    }),
    columnHelper.accessor((row) => row, {
      id: 'actions',
      header: '',
      cell: ({ getValue }) => (
        <Group justify="flex-end" gap="xs" align="center">
          <ActionIcon
            component={Link}
            to={`/app/paginas/edit/${getValue().id}`}
            variant="transparent"
            size="lg"
          >
            <IconEdit />
          </ActionIcon>
            <ActionIcon
              variant="transparent"
              size="lg"
              color='#fa5252'
              onClick={() => {
                onDelete(getValue().title,getValue().id)
              }}
            >
            <IconTrash />
          </ActionIcon>
        </Group>
      ),
    }),
  ];

  return (
    <Table<Page>
      columns={columns}
      data={data?.items || []}
      loading={isLoading}
    />
  );
}
