import { useEffect } from 'react';
import { AxiosError } from 'axios';
import {
  Button,
  Divider,
  Group,
  Modal,
  ModalProps,
  NumberInput,
  Radio,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import dayjs from 'dayjs';
import * as Yup from 'yup';

import {
  Coupon,
  CouponRequest,
  getCouponType,
  useCreateCoupon,
  useUpdateCoupon,
} from '@/core/services/coupons';
import { getFormErrors } from '@/core/utils';
import { DateInput } from '@mantine/dates';

type Props = ModalProps & {
  coupon?: Coupon;
};

const schema = Yup.object().shape({
  code: Yup.string()
    .required('Campo Obrigatório')
    .uppercase('O código deve possuir letras maiúsculas e números'),
  type: Yup.string().required('Campo Obrigatório'),
  amount: Yup.number()
    .required('Campo Obrigatório')
    .min(1, 'Informe um valor maior que 0')
    .max(100, 'Informe um valor menor que 100'),
  expiration: Yup.date()
    .required('Campo Obrigatório')
    .min(
      dayjs().add(1, 'day').toDate(),
      'Informe um data de vencimento maior que o dia atual'
    ),
});

export function CouponModal({ coupon, ...props }: Props) {
  const createMutation = useCreateCoupon();
  const updateMutation = useUpdateCoupon();

  const form = useForm<CouponRequest>({
    validate: yupResolver(schema),
    initialValues: {
      code: '',
      type: 'fixed',
      expiration: null,
      amount: 0,
    },
  });

  async function handleSave(values: CouponRequest) {
    const obj = {
      ...values,
      code: values.code.toUpperCase(),
      expiration: dayjs(values.expiration).format('YYYY-MM-DD'),
    };

    try {
      if (coupon) {
        await updateMutation.mutateAsync({ ...obj, id: coupon.id });
      } else {
        await createMutation.mutateAsync(obj);
      }

      handleClose();
    } catch (error) {
      form.setErrors({ ...getFormErrors(error as AxiosError) });
    }
  }

  function handleClose() {
    form.reset();
    props.onClose();
  }

  useEffect(() => {
    if (coupon) {
      form.setValues({
        ...coupon,
        expiration: dayjs(coupon.expiration).toDate(),
      });
    }
  }, [coupon]);

  return (
    <Modal
      {...props}
      title={coupon ? 'Editar Cupom' : 'Novo Cupom'}
      centered
      onClose={handleClose}
    >
      <form onSubmit={form.onSubmit(handleSave)}>
        <Stack gap="md">
          <TextInput
            {...form.getInputProps('code')}
            label="Código do cupom"
            placeholder="EX: DESCONTO10"
            withAsterisk
            disabled={!!coupon}
            styles={{
              input: {
                textTransform: 'uppercase',
              },
            }}
          />
          <Radio.Group
            {...form.getInputProps('type')}
            label="Tipo de desconto"
            withAsterisk
          >
            <Radio
              value="fixed"
              label={getCouponType('fixed')}
              disabled={!!coupon}
            />
            <Radio
              value="percentage"
              label={getCouponType('percentage')}
              disabled={!!coupon}
            />
          </Radio.Group>
          <NumberInput
            {...form.getInputProps('amount')}
            label="Valor do desconto"
            placeholder="Informe o valor do desconto"
            withAsterisk
            disabled={!!coupon}
            min={0}
            max={100}
          />
          <DateInput
            {...form.getInputProps('expiration')}
            label="Data de vencimento"
            placeholder="Informe a data de vencimento do cupom"
            clearable
            withAsterisk
            valueFormat="DD/MM/YYYY"
          />
          <Divider />
          <Group gap="sm" justify="flex-end">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              loading={createMutation.isLoading || updateMutation.isLoading}
            >
              Salvar Cupom
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
