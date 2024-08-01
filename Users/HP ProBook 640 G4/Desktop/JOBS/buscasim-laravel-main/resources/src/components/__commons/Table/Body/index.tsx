import {
  Center,
  Loader,
  Table as MantineTable,
  Stack,
  Text,
} from '@mantine/core';
import {
  ColumnDef,
  Table as ReactTable,
  flexRender,
} from '@tanstack/react-table';
import { IconFolderOpen } from '@tabler/icons-react';

interface Props<T> {
  columns: ColumnDef<T, any>[];
  table: ReactTable<T>;
  loading?: boolean;
}

export function TableBody<T>({ table, columns, loading }: Props<T>) {
  const { rows } = table.getRowModel();

  return (
    <MantineTable.Tbody>
      {loading && (
        <MantineTable.Tr>
          <MantineTable.Td colSpan={columns.length}>
            <Center h={200}>
              <Loader />
            </Center>
          </MantineTable.Td>
        </MantineTable.Tr>
      )}

      {!loading && rows.length === 0 && (
        <MantineTable.Tr>
          <MantineTable.Td colSpan={columns.length}>
            <Center h={200}>
              <Stack align="center">
                <IconFolderOpen size={48} color="gray" />
                <Text c="dimmed">Não há dados</Text>
              </Stack>
            </Center>
          </MantineTable.Td>
        </MantineTable.Tr>
      )}

      {!loading &&
        rows.map((row) => (
          <MantineTable.Tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <MantineTable.Td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </MantineTable.Td>
            ))}
          </MantineTable.Tr>
        ))}
    </MantineTable.Tbody>
  );
}
