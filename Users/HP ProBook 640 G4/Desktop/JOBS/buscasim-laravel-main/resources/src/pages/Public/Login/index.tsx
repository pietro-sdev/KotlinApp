import {
  Button,
  Center,
  Image,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { yupResolver } from 'mantine-form-yup-resolver';
import { useForm } from '@mantine/form';
import { IconLogin2 } from '@tabler/icons-react';
import * as yup from 'yup';

import { AnchorLink } from '@/components/__commons';
import { LoginRequest, useLogin } from '@/core/services/auth';

import logo from '@/assets/logo.svg';
import classes from '@/styles/pages.module.css';

const schema = yup.object().shape({
  email: yup.string().required('Campo Obrigatório').email('E-mail inválido'),
  password: yup.string().min(2, 'A senha precisa ter no mínimo 8 caracteres'),
});

export default function LoginPage() {
  const loginMutation = useLogin();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: yupResolver(schema),
  });

  async function handleSubmit(values: LoginRequest) {
    await loginMutation.mutateAsync(values);
  }

  return (
    <Center className={classes.wrapper}>
      <Paper withBorder p={30} mt={30} radius="xs">
        <Stack>
          <Center>
            <Image src={logo} w={200} />
          </Center>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Informe seu usuário e senha para acessar a plataforma.
          </Text>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="E-mail"
              placeholder="email@exemplo.com"
              withAsterisk
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Senha"
              placeholder="********"
              withAsterisk
              mt="md"
              {...form.getInputProps('password')}
            />
            <Button
              type="submit"
              fullWidth
              mt="xl"
              rightSection={<IconLogin2 />}
              loading={loginMutation.isLoading}
            >
              Entrar
            </Button>
          </form>
          <AnchorLink href="/esqueci-minha-senha">
            Esqueci minha senha
          </AnchorLink>
        </Stack>
      </Paper>
    </Center>
  );
}
