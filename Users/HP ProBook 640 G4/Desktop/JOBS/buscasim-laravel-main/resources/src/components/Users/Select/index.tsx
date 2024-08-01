import { useEffect, useState } from 'react';
import { Select, SelectProps } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useUsers } from '@/core/services/users';

type OptionType = { value: string; label: string };

type Props = { selected?: OptionType } & SelectProps;

export function UserSelect({ selected, ...props }: Props) {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [params, setParams] = useState<{ name: string }>();
  const [debounced] = useDebouncedValue(params, 200);
  const { data } = useUsers(debounced);

  useEffect(() => {
    if (data) {
      setOptions([
        ...data.items.map((item) => ({
          value: String(item.id),
          label: item.name,
        })),
      ]);
    }

    if (selected) {
      // setOptions((prev) => [...prev, selected]);
    }
  }, [data, selected]);

  return (
    <Select
      {...props}
      data={options}
      onSearchChange={(value) => setParams({ name: value })}
    />
  );
}
