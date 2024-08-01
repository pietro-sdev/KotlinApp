import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Divider,
  Group,
  Modal,
  ModalProps,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { IconLockOpen } from '@tabler/icons-react';
import * as yup from 'yup';

import { RegisterRequest, useRegister } from '@/core/services/auth';
import { getFormErrors } from '@/core/utils';
import { AnchorLink } from '@/components/__commons';

const schema = yup.object().shape({
  name: yup.string().required('Campo Obrigatório'),
  email: yup
    .string()
    .required('Campo Obrigatório')
    .email('Informe um e-mail válido'),
  accept_terms: yup.boolean().oneOf([true], 'Aceite os termos par continuar'),
});

export function RegisterModal({ ...props }: ModalProps) {
  const { state } = useLocation();
  const registerMutation = useRegister();

  const form = useForm<RegisterRequest>({
    validate: yupResolver(schema),
    initialValues: {
      name: '',
      email: '',
      accept_terms: false,
      plate: '',
    },
  });

  async function handleRegister(values: RegisterRequest) {
    console.log(values);
    // try {
    //   await registerMutation.mutateAsync(values);

    //   handleClose();
    // } catch (error) {
    //   form.setErrors({ ...getFormErrors(error as AxiosError) });
    // }
  }

  function handleClose() {
    form.reset();
    props.onClose();
  }

  useEffect(() => {
    if (state.results) {
      const { extra } = state.results;

      form.setValues({
        plate: extra.placa_modelo_antigo,
      });
    }
  }, [state.results]);

  return (
    <Modal
      {...props}
      title={<Text fw="bold">Você está quase lá</Text>}
      centered
      onClose={handleClose}
    >
      <Stack>
        <Text>
          Você está a um passo de visualizar todas as informações do veículo.
        </Text>
        <form onSubmit={form.onSubmit((values) => handleRegister(values))}>
          <Stack gap="md">
            <TextInput
              {...form.getInputProps('name')}
              label="Seu nome"
              placeholder="Informe o seu nome"
              withAsterisk
            />
            <TextInput
              {...form.getInputProps('email')}
              label="Seu e-mail"
              placeholder="Adicione o e-mail"
              description="Não vamos compartilhar seu e-mail com terceiros"
              withAsterisk
            />
            <Checkbox
              {...form.getInputProps('accept_terms', { type: 'checkbox' })}
              label={
                <Text>
                  Aceito os termos e condições presentes na nossa{' '}
                  <AnchorLink href="/politica-de-privacidade" blank>
                    política de privacidade
                  </AnchorLink>
                </Text>
              }
            />
            <Divider />
            <Group gap="sm" justify="flex-end">
              <Button
                leftSection={<IconLockOpen />}
                type="submit"
                fullWidth
                loading={registerMutation.isLoading}
              >
                Desbloquear as informações
              </Button>
            </Group>
          </Stack>
        </form>
      </Stack>
    </Modal>
  );
}
