import { Button, Group, Input, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSearch } from '@tabler/icons-react';
import {
  UserListQuery,
  UserRolesType,
  userRolesOptions,
} from '@/core/services/users';

interface Props {
  onChange: (values: UserListQuery) => void;
}

const initialValues: UserListQuery = {
  name: '',
  email: '',
  role: null,
  page: 1,
};

export function UsersFilters({ onChange }: Props) {
  const form = useForm<UserListQuery>({
    initialValues: initialValues,
  });

  function handleChange(values?: UserListQuery) {
    form.setValues({ ...values });
    onChange({ ...values });
  }

  function handleReset() {
    form.reset();
    onChange(initialValues);
  }

  return (
    <form onReset={handleReset}>
      <Group justify="flex-end" gap="sm">
        <Input
          {...form.getInputProps('name')}
          placeholder="Pesquise por nome"
          rightSection={<IconSearch />}
          onChange={(e) =>
            handleChange({ ...form.values, name: e.target.value })
          }
        />
        <Input
          {...form.getInputProps('email')}
          placeholder="Pesquise por e-mail"
          rightSection={<IconSearch />}
          onChange={(e) =>
            handleChange({ ...form.values, email: e.target.value })
          }
        />
        <Select
          {...form.getInputProps('role')}
          placeholder="Tipo de usuário"
          data={userRolesOptions}
          clearable
          onChange={(value) =>
            handleChange({
              ...form.values,
              role: value as UserRolesType,
            })
          }
        />
        <Button variant="outline" type="reset" onClick={handleReset}>
          Limpar filtros
        </Button>
      </Group>
    </form>
  );
}
