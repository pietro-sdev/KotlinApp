import {
  Button,
  Center,
  Image,
  Paper,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { yupResolver } from 'mantine-form-yup-resolver';
import { useForm } from '@mantine/form';
import { IconMail } from '@tabler/icons-react';
import * as yup from 'yup';
import { ForgotRequest, useForgot } from '@/core/services/auth';

import logo from '@/assets/logo.svg';
import { AnchorLink } from '@/components/__commons';
import classes from '@/styles/pages.module.css';

const schema = yup.object().shape({
  email: yup.string().required('Campo Obrigatório').email('E-mail inválido'),
});

export default function ForgotPage() {
  const mutation = useForgot();

  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: yupResolver(schema),
  });

  async function handleSubmit(values: ForgotRequest) {
    await mutation.mutateAsync(values);
  }

  return (
    <Center className={classes.wrapper}>
      <Paper withBorder p={30} mt={30} radius="xs">
        <Stack>
          <Center>
            <Image src={logo} w={200} />
          </Center>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Informe seu e-mail para receber um link para a recuperação da senha.
          </Text>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="E-mail"
              placeholder="email@exemplo.com"
              withAsterisk
              {...form.getInputProps('email')}
            />

            <Button
              type="submit"
              fullWidth
              mt="xl"
              rightSection={<IconMail />}
              loading={mutation.isLoading}
            >
              Recuperar Senha
            </Button>
          </form>
          <AnchorLink href="/entrar">Voltar para o login</AnchorLink>
        </Stack>
      </Paper>
    </Center>
  );
}
