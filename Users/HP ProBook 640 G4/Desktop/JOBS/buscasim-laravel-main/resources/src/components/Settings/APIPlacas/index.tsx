import { Paper, Stack, Text, TextInput, Title } from '@mantine/core';

import { AnchorLink } from '@/components/__commons';
import { OptionsFormProps } from '..';

export function APIPlacasForm({ form }: OptionsFormProps) {
  return (
    <Paper p="md" withBorder>
      <Stack>
        <Title order={3}>API Placas</Title>
        <Text c="dimmed">
          Gerencie as informações necessárias para a integração com a{' '}
          <AnchorLink href="https://apiplacas.com.br" blank>
            API Placas
          </AnchorLink>
          .
        </Text>

        <Stack>
          <TextInput
            {...form.getInputProps('options.1.value')}
            label="Token plano Free"
          />
          <TextInput
            {...form.getInputProps('options.2.value')}
            label="Token plano Premium"
          />
        </Stack>
      </Stack>
    </Paper>
  );
}
