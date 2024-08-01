import { Button, Group, Select } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import {
  OrderListQuery,
  OrderStatusType,
  orderStatusOptions,
} from '@/core/services/orders';

interface Props {
  onChange: (values: OrderListQuery) => void;
}

const initialValues: OrderListQuery = {
  date: null,
  status: null,
  page: 1,
};

export function OrdersFilters({ onChange }: Props) {
  const form = useForm<OrderListQuery>({
    initialValues: initialValues,
  });

  function handleChange(values?: OrderListQuery) {
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
        <DateInput
          {...form.getInputProps('date')}
          placeholder="Pesquise por data"
          clearable
          onChange={(date) => handleChange({ ...form.values, date })}
        />
        <Select
          {...form.getInputProps('status')}
          placeholder="Status do pedido"
          data={orderStatusOptions}
          clearable
          onChange={(value) =>
            handleChange({
              ...form.values,
              status: value as OrderStatusType,
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
