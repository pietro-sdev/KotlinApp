import { Button, Group, Input, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSearch } from '@tabler/icons-react';
import {
  CouponListQuery,
  CouponType,
  couponTypeOptions,
} from '@/core/services/coupons';

interface Props {
  onChange: (values: CouponListQuery) => void;
}

const initialValues: CouponListQuery = {
  code: '',
  type: null,
  page: 1,
};

export function CouponsFilters({ onChange }: Props) {
  const form = useForm<CouponListQuery>({
    initialValues: initialValues,
  });

  function handleChange(values?: CouponListQuery) {
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
          {...form.getInputProps('code')}
          placeholder="Pesquise por código"
          rightSection={<IconSearch />}
          onChange={(e) =>
            handleChange({ ...form.values, code: e.target.value })
          }
        />
        <Select
          {...form.getInputProps('type')}
          placeholder="Tipo do cupon"
          data={couponTypeOptions}
          clearable
          onChange={(value) =>
            handleChange({
              ...form.values,
              type: value as CouponType,
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
