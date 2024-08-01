import { Paper, Stack, Text, TextInput, Title } from '@mantine/core';

import { OptionsFormProps } from '..';

export function MercadoPagoForm({ form }: OptionsFormProps) {
  return (
    <Paper p="md" withBorder>
      <Stack>
        <Title order={3}>Mercado Pago</Title>
        <Text c="dimmed">
          Adicione o seu token do Mercado Pago, e receba os pagamentos diretos
          na sua conta.
        </Text>

        <Stack>
          <TextInput
            {...form.getInputProps('options.4.value')}
            placeholder="Adicione o token da sua conta"
          />
        </Stack>
      </Stack>
    </Paper>
  );
}
