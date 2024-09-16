import { useEffect } from 'react';
import {
  Button,
  Divider,
  Group,
  Modal,
  ModalProps,
  Stack,
  TextInput,
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
});

export function UserModal({ user, ...props }: Props) {
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  const form = useForm<UserRequest>({
    validate: yupResolver(schema),
    initialValues: {
      name: '',
      email: '',
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
      form.setValues({ ...user });
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
