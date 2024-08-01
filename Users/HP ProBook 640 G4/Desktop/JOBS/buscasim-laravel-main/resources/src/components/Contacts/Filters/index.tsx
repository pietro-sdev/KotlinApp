import { ContactListQuery } from '@/core/services/contacts';
import { Button, Group, Input } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSearch } from '@tabler/icons-react';

interface Props {
  onChange: (values: ContactListQuery) => void;
}

const initialValues: ContactListQuery = {
  name: '',
  email: '',
  subject: '',
  page: 1,
};

export function ContactsFilters({ onChange }: Props) {
  const form = useForm<ContactListQuery>({
    initialValues: initialValues,
  });

  function handleChange(values?: ContactListQuery) {
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
        <Input
          {...form.getInputProps('subject')}
          placeholder="Pesquise por assunto"
          rightSection={<IconSearch />}
          onChange={(e) =>
            handleChange({ ...form.values, subject: e.target.value })
          }
        />
        <Button variant="outline" type="reset" onClick={handleReset}>
          Limpar filtros
        </Button>
      </Group>
    </form>
  );
}
