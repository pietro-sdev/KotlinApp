import {
  Button,
  Center,
  Image,
  Loader,
  Paper,
  PasswordInput,
  Stack,
  Text,
} from '@mantine/core';
import { yupResolver } from 'mantine-form-yup-resolver';
import { useForm } from '@mantine/form';
import { IconLock } from '@tabler/icons-react';
import * as yup from 'yup';
import { ResetRequest, useReset, useVerify } from '@/core/services/auth';

import { useParams } from 'react-router-dom';
import classes from '@/styles/pages.module.css';
import logo from '@/assets/logo.svg';

const schema = yup.object().shape({
  password: yup
    .string()
    .required('Campo Obrigatório')
    .min(8, 'A senha deve ter no mínimo 8 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas não são iguais'),
});

export default function ResetPage() {
  const { token } = useParams();
  const { isLoading } = useVerify(token);
  const mutation = useReset();

  const form = useForm({
    initialValues: {
      password: '',
      password_confirmation: '',
      token: '',
    },
    validate: yupResolver(schema),
  });

  async function handleSubmit(values: ResetRequest) {
    console.log(values);
    await mutation.mutateAsync({ ...values, token });
  }

  if (isLoading)
    return (
      <Center h="100%">
        <Loader />
      </Center>
    );

  return (
    <Center className={classes.wrapper}>
      <Paper withBorder p={30} mt={30} radius="xs">
        <Stack>
          <Center>
            <Image src={logo} w={200} />
          </Center>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Informe sua nva senha. Você será redirecionado após a alteração.
          </Text>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <PasswordInput
              {...form.getInputProps('password')}
              label="Nova Senha"
              placeholder="********"
              withAsterisk
              mt="md"
            />
            <PasswordInput
              {...form.getInputProps('password_confirmation')}
              label="Confirme a Senha"
              placeholder="********"
              withAsterisk
              mt="md"
            />
            <Button
              type="submit"
              fullWidth
              mt="xl"
              rightSection={<IconLock />}
              loading={mutation.isLoading}
            >
              Alterar Senha
            </Button>
          </form>
        </Stack>
      </Paper>
    </Center>
  );
}
