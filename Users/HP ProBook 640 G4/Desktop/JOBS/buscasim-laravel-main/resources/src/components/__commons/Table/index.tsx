import { Flex, Table as MantineTable, Pagination, Stack } from '@mantine/core';
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { TableHeader } from './Header';
import { TableBody } from './Body';

interface Props<T> {
  columns: ColumnDef<T, any>[];
  data: T[];
  pagination?: {
    total: number;
    onPaginate: (page: number) => void;
  };
  loading?: boolean;
}

export function Table<T>({ columns, data, pagination, loading }: Props<T>) {
  const table = useReactTable<T>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Stack gap="md">
      <MantineTable.ScrollContainer minWidth={500}>
        <MantineTable verticalSpacing="md">
          <TableHeader table={table} />
          <TableBody table={table} columns={columns} loading={loading} />
        </MantineTable>
      </MantineTable.ScrollContainer>

      {pagination && (
        <Flex justify="center">
          <Pagination
            total={pagination.total}
            onChange={pagination.onPaginate}
          />
        </Flex>
      )}
    </Stack>
  );
}
