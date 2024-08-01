import { useEffect } from 'react';
import {
  Button,
  Divider,
  Group,
  Modal,
  ModalProps,
  Stack,
  TextInput,
  Switch,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import {
  User,
  UserRequest,
  useCreateUser,
  useUpdateUser,
} from '@/core/services/users';
import { getFormErrors } from '@/core/utils';
import { AxiosError } from 'axios';

type Props = ModalProps & {
  user?: User;
};

const schema = Yup.object().shape({
  name: Yup.string().required('Campo Obrigatório'),
  email: Yup.string()
    .required('Campo Obrigatório')
    .email('Informe um e-mail válido'),
  orders: Yup.boolean(),
  coupons: Yup.boolean(),
  contacts: Yup.boolean(),
  pages: Yup.boolean(),
  users: Yup.boolean(),
  settings: Yup.boolean(),
  visible_fields: Yup.boolean(),
});

export function UserModal({ user, ...props }: Props) {
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  const form = useForm<UserRequest>({
    validate: yupResolver(schema),
    initialValues: {
      name: '',
      email: '',
      orders: false,
      coupons: false,
      contacts: false,
      pages: false,
      users: false,
      settings: false,
      visible_fields: false,
    },
  });

  async function handleSave(values: UserRequest) {
    try {
      if (user) {
        await updateMutation.mutateAsync({ ...values, id: user.id });
      } else {
        await createMutation.mutateAsync(values);
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
    if (user) {
      form.setValues({
        ...user,
        orders: user.permissions?.orders || false,
        coupons: user.permissions?.coupons || false,
        contacts: user.permissions?.contacts || false,
        pages: user.permissions?.pages || false,
        users: user.permissions?.users || false,
        settings: user.permissions?.settings || false,
        visible_fields: user.permissions?.visible_fields || false,
      });
    }
  }, [user]);

  return (
    <Modal
      {...props}
      title={user ? 'Editar Usuário' : 'Novo usuário'}
      centered
      onClose={handleClose}
    >
      <form onSubmit={form.onSubmit((values) => handleSave(values))}>
        <Stack gap="md">
          <TextInput
            {...form.getInputProps('name')}
            label="Nome"
            placeholder="Adicione o nome do usuário"
            withAsterisk
          />
          <TextInput
            {...form.getInputProps('email')}
            label="E-mail"
            placeholder="Adicione o e-mail"
            withAsterisk
          />
          <Divider />
          <Switch
            {...form.getInputProps('orders', { type: 'checkbox' })}
            label="Pedidos"
          />
          <Switch
            {...form.getInputProps('coupons', { type: 'checkbox' })}
            label="Cupons"
          />
          <Switch
            {...form.getInputProps('contacts', { type: 'checkbox' })}
            label="Contatos"
          />
          <Switch
            {...form.getInputProps('pages', { type: 'checkbox' })}
            label="Páginas"
          />
          <Switch
            {...form.getInputProps('users', { type: 'checkbox' })}
            label="Usuários"
          />
          <Switch
            {...form.getInputProps('settings', { type: 'checkbox' })}
            label="Configurações"
          />
          <Switch
            {...form.getInputProps('visible_fields', { type: 'checkbox' })}
            label="Campos Visíveis"
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
              Salvar Usuário
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
