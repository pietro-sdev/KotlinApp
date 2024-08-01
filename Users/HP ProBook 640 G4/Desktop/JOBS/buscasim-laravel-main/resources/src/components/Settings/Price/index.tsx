import { NumberInput, Paper, Stack, Text, Title } from '@mantine/core';

import { OptionsFormProps } from '..';

export function PriceForm({ form }: OptionsFormProps) {
  return (
    <Paper p="md" withBorder>
      <Stack>
        <Title order={3}>Valor da consulta</Title>
        <Text c="dimmed">Gerencie o valor da consulta premium na API.</Text>

        <Stack>
          <NumberInput
            {...form.getInputProps('options.3.value')}
            min={0}
            prefix="R$ "
            decimalScale={2}
            decimalSeparator=","
            thousandSeparator="."
          />
        </Stack>
      </Stack>
    </Paper>
  );
}
