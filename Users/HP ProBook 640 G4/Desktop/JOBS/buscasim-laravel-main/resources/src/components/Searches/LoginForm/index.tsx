import { Button, Image, Paper, Stack, Text, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { MaskedInput } from '@/components/__commons';
import { CustomerLoginRequest } from '@/core/services/auth';
import logo from '@/assets/logo.svg';

interface Props {
  form: UseFormReturnType<CustomerLoginRequest>;
  loading: boolean;
}

export function SearchesLoginForm({ form, loading }: Props) {
  return (
    <Paper withBorder p="md">
      <Stack>
        <Image mx="auto" src={logo} w={100} h={48} />
        <Text c="dimmed">
          Informe o seu e-mail e CPF para ver todas as suas consultas.
        </Text>
        <TextInput
          {...form.getInputProps('email')}
          label="Seu e-mail"
          placeholder="EX: exemplo@email.com"
          withAsterisk
          autoComplete="email"
        />
        <MaskedInput
          {...form.getInputProps('document')}
          mask="cpf"
          label="CPF"
          placeholder="000.000.000-00"
          autoComplete="cpf"
        />
        <Button type="submit" loading={loading} fullWidth>
          Ver minhas consultas
        </Button>
      </Stack>
    </Paper>
  );
}
