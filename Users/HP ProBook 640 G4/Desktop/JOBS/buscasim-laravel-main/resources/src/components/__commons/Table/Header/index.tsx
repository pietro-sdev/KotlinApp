import { Table as MantineTable } from '@mantine/core';
import { Table as ReactTable, flexRender } from '@tanstack/react-table';

interface Props<T> {
  table: ReactTable<T>;
}

export function TableHeader<T>({ table }: Props<T>) {
  return (
    <MantineTable.Thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <MantineTable.Tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <MantineTable.Th
              key={header.id}
              style={{ fontSize: 12, color: '#74787d' }}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </MantineTable.Th>
          ))}
        </MantineTable.Tr>
      ))}
    </MantineTable.Thead>
  );
}
